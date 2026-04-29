"use client";

import { useEffect, useState } from "react";
import {
  defaultSiteContent,
  SiteContent,
  
  ImageStyle,
  LocalizedText,
} from "../lib/siteContent";
import DatabaseSection from "./DatabaseSection";

type Tab = "home" | "about" | "contact" | "oeuvres" | "portfolio" | "database";

const MAX_OEUVRES = 20;
const MAX_GALLERY_IMAGES = 20;

type GalleryImageItem = {
  src: string;
  isAvailable: boolean;
  dimensions: string;
  availability: LocalizedText;
};

function makeGalleryImage(
  src = "",
  isAvailable = false,
  dimensions = ""
): GalleryImageItem {
  return {
    src,
    isAvailable,
    dimensions,
    availability: isAvailable
      ? { fr: "Disponible", en: "Available", es: "Disponible" }
      : { fr: "Indisponible", en: "Not available", es: "No disponible" },
  };
}

export default function DashboardPage() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [saved, setSaved] = useState(false);

 useEffect(() => {
  const loadContent = async () => {
    try {
      const res = await fetch("/api/site-content", {
        cache: "no-store",
      });

      const parsed = await res.json();

      if (!parsed) {
        setContent(defaultSiteContent);
        return;
      }

      setContent({
        ...defaultSiteContent,
        ...parsed,

        home: {
          ...defaultSiteContent.home,
          ...(parsed.home ?? {}),
          heroImageStyle: {
            ...defaultSiteContent.home.heroImageStyle,
            ...(parsed.home?.heroImageStyle ?? {}),
          },
          gallery: {
            ...defaultSiteContent.home.gallery,
            ...(parsed.home?.gallery ?? {}),
            works: (
              parsed.home?.gallery?.works ?? defaultSiteContent.home.gallery.works
            ).map((item: any, index: number) => ({
              ...(defaultSiteContent.home.gallery.works[index] ?? {}),
              ...item,
            })),
          },
        },

        about: {
          ...defaultSiteContent.about,
          ...(parsed.about ?? {}),
          profileImage: {
            ...defaultSiteContent.about.profileImage,
            ...(parsed.about?.profileImage ?? {}),
          },
          publications:
            parsed.about?.publications ?? defaultSiteContent.about.publications,
          collections:
            parsed.about?.collections ?? defaultSiteContent.about.collections,
          exhibitions:
            parsed.about?.exhibitions ?? defaultSiteContent.about.exhibitions,
          formations:
            parsed.about?.formations ?? defaultSiteContent.about.formations,
          distinctions:
            parsed.about?.distinctions ?? defaultSiteContent.about.distinctions,
        },

        contact: {
          ...defaultSiteContent.contact,
          ...(parsed.contact ?? {}),
          contactImage: {
            ...defaultSiteContent.contact.contactImage,
            ...(parsed.contact?.contactImage ?? {}),
          },
        },

  oeuvres: {
  ...defaultSiteContent.oeuvres,
  ...(parsed.oeuvres ?? {}),
  items: (parsed.oeuvres?.items ?? defaultSiteContent.oeuvres.items).map(
    (item: any, index: number) => {
      const defaultItem = defaultSiteContent.oeuvres.items[index] ?? {};

      return {
        ...defaultItem,
        ...item,

        year: item?.year ?? defaultItem?.year ?? "",
        dimensions: item?.dimensions ?? defaultItem?.dimensions ?? "",
        titleSize: item?.titleSize ?? defaultItem?.titleSize ?? "large",

        technique:
          item?.technique ??
          defaultItem?.technique ??
          { fr: "", en: "", es: "" },

        availability:
          item?.availability ??
          defaultItem?.availability ??
          {
            fr: "Disponible",
            en: "Available",
            es: "Disponible",
          },

        galleryImages: (
          item?.galleryImages ??
          defaultItem?.galleryImages ??
          []
        ).map((galleryImage: any) =>
          typeof galleryImage === "string"
            ? makeGalleryImage(galleryImage, false, item?.dimensions ?? defaultItem?.dimensions ?? "")
            : makeGalleryImage(
                galleryImage?.src ?? "",
                galleryImage?.isAvailable === true,
                galleryImage?.dimensions ?? item?.dimensions ?? defaultItem?.dimensions ?? ""
              )
        ),
      };
    }
  ),
},

        portfolio: (parsed.portfolio ?? defaultSiteContent.portfolio).map(
          (item: any, index: number) => ({
            ...(defaultSiteContent.portfolio[index] ?? {}),
            ...item,
          })
        ),
      });
    } catch (error) {
      console.error(error);
      setContent(defaultSiteContent);
    }
  };

  loadContent();
}, []);

  const saveContent = async () => {
  try {
    await fetch("/api/site-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  } catch (error) {
    console.error(error);
    alert("Erreur lors de la sauvegarde dans Aiven.");
  }
};

const resetContent = async () => {
  try {
    await fetch("/api/site-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(defaultSiteContent),
    });

    setContent(defaultSiteContent);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  } catch (error) {
    console.error(error);
    alert("Erreur lors de la réinitialisation.");
  }
};

  return (
    <main className="min-h-screen bg-[#f6f1eb] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[12px] uppercase tracking-[0.35em] text-[#b49686]">
              Dashboard global
            </p>
            <h1 className="mt-3 text-4xl font-light tracking-[-0.04em] text-[#191614] sm:text-5xl">
              Gestion de toutes les pages
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-8 text-[#8f7d76]">
              Modifiez les textes, les images et les œuvres depuis une seule
              interface.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={resetContent}
              className="inline-flex h-[52px] items-center justify-center rounded-full border border-[#e2d6cf] bg-white px-6 text-[14px] font-medium text-[#6d5a53] transition hover:bg-[#faf7f4]"
            >
              Réinitialiser
            </button>

            <button
              type="button"
              onClick={saveContent}
              className="inline-flex h-[52px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#171311_0%,#1d1715_50%,#2a211d_100%)] px-8 text-[14px] font-medium uppercase tracking-[0.18em] text-white shadow-[0_14px_30px_rgba(0,0,0,0.12)] transition hover:-translate-y-[1px]"
            >
              Enregistrer
            </button>
          </div>
        </div>

        {saved && (
          <div className="mb-6 rounded-[20px] border border-[#e6ddd6] bg-white px-5 py-4 text-sm text-[#6f5d57] shadow-sm">
            Les modifications ont été enregistrées.
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-[28px] border border-[#e7ddd6] bg-white/80 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl">
            <TabButton active={activeTab === "home"} onClick={() => setActiveTab("home")} label="Page d’accueil" />
            <TabButton active={activeTab === "about"} onClick={() => setActiveTab("about")} label="Page à propos" />
            <TabButton active={activeTab === "contact"} onClick={() => setActiveTab("contact")} label="Page contact" />
            <TabButton active={activeTab === "oeuvres"} onClick={() => setActiveTab("oeuvres")} label="Page œuvres" />
            <TabButton active={activeTab === "portfolio"} onClick={() => setActiveTab("portfolio")} label="Portfolio" />
            <TabButton active={activeTab === "database"} onClick={() => setActiveTab("database")} label="Base de données" />
          </aside>

          <section className="rounded-[30px] border border-[#e7ddd6] bg-white/80 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl sm:p-8">
            {activeTab === "home" && (
              <EditorBlock title="Page d’accueil" subtitle="Modifier la section principale">
                <LocalizedField label="Badge" value={content.home.badge} onChange={(value) => setContent({ ...content, home: { ...content.home, badge: value } })} />
                <LocalizedField label="Titre" value={content.home.title} onChange={(value) => setContent({ ...content, home: { ...content.home, title: value } })} />
                <LocalizedTextareaField label="Texte 1" value={content.home.text1} onChange={(value) => setContent({ ...content, home: { ...content.home, text1: value } })} />
                <LocalizedTextareaField label="Texte 2" value={content.home.text2} onChange={(value) => setContent({ ...content, home: { ...content.home, text2: value } })} />

                <ImageUploadField
                  label="Image principale"
                  value={content.home.image}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      home: {
                        ...content.home,
                        image: value,
                        heroImageStyle: {
                          ...content.home.heroImageStyle,
                          src: value,
                        },
                      },
                    })
                  }
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <LocalizedField label="Bouton principal" value={content.home.primaryButton} onChange={(value) => setContent({ ...content, home: { ...content.home, primaryButton: value } })} />
                  <LocalizedField label="Bouton secondaire" value={content.home.secondaryButton} onChange={(value) => setContent({ ...content, home: { ...content.home, secondaryButton: value } })} />
                </div>

                <ImageStyleEditor title="Style de l’image hero" value={content.home.heroImageStyle} onChange={(style) => setContent({ ...content, home: { ...content.home, heroImageStyle: style } })} />

                <div className="rounded-[24px] border border-[#ece3dc] bg-[#fcfaf8] p-5 sm:p-6">
                  <h3 className="mb-5 text-xl font-medium text-[#201c19]">
                    Galerie page d’accueil
                  </h3>

                  <div className="grid gap-5">
                    <LocalizedField
                      label="Badge galerie"
                      value={content.home.gallery.badge}
                      onChange={(value) =>
                        setContent({
                          ...content,
                          home: {
                            ...content.home,
                            gallery: {
                              ...content.home.gallery,
                              badge: value,
                            },
                          },
                        })
                      }
                    />

                    <LocalizedField
                      label="Titre galerie"
                      value={content.home.gallery.title}
                      onChange={(value) =>
                        setContent({
                          ...content,
                          home: {
                            ...content.home,
                            gallery: {
                              ...content.home.gallery,
                              title: value,
                            },
                          },
                        })
                      }
                    />

                    <ImageUploadField
                      label="Grande image"
                      value={content.home.gallery.featuredImage}
                      onChange={(value) =>
                        setContent({
                          ...content,
                          home: {
                            ...content.home,
                            gallery: {
                              ...content.home.gallery,
                              featuredImage: value,
                            },
                          },
                        })
                      }
                    />

                    <LocalizedField
                      label="Badge œuvre mise en avant"
                      value={content.home.gallery.featuredBadge}
                      onChange={(value) =>
                        setContent({
                          ...content,
                          home: {
                            ...content.home,
                            gallery: {
                              ...content.home.gallery,
                              featuredBadge: value,
                            },
                          },
                        })
                      }
                    />

                    <LocalizedField
                      label="Titre œuvre mise en avant"
                      value={content.home.gallery.featuredTitle}
                      onChange={(value) =>
                        setContent({
                          ...content,
                          home: {
                            ...content.home,
                            gallery: {
                              ...content.home.gallery,
                              featuredTitle: value,
                            },
                          },
                        })
                      }
                    />

                    <LocalizedTextareaField
                      label="Paragraphe œuvre mise en avant"
                      value={content.home.gallery.featuredText}
                      onChange={(value) =>
                        setContent({
                          ...content,
                          home: {
                            ...content.home,
                            gallery: {
                              ...content.home.gallery,
                              featuredText: value,
                            },
                          },
                        })
                      }
                    />

                    <div className="grid gap-6">
                      {content.home.gallery.works.map((work, index) => (
                        <div key={index} className="rounded-[22px] border border-[#eadfd8] bg-white p-5">
                          <h4 className="mb-5 text-lg font-medium text-[#201c19]">
                            Œuvre accueil {index + 1}
                          </h4>

                          <div className="grid gap-5">
                            <ImageUploadField
                              label="Image"
                              value={work.src}
                              onChange={(value) => {
                                const updated = [...content.home.gallery.works];
                                updated[index] = { ...updated[index], src: value };
                                setContent({
                                  ...content,
                                  home: {
                                    ...content.home,
                                    gallery: {
                                      ...content.home.gallery,
                                      works: updated,
                                    },
                                  },
                                });
                              }}
                            />

                            <LocalizedField
                              label="Titre"
                              value={work.title}
                              onChange={(value) => {
                                const updated = [...content.home.gallery.works];
                                updated[index] = { ...updated[index], title: value };
                                setContent({
                                  ...content,
                                  home: {
                                    ...content.home,
                                    gallery: {
                                      ...content.home.gallery,
                                      works: updated,
                                    },
                                  },
                                });
                              }}
                            />

                            <LocalizedField
                              label="Catégorie"
                              value={work.category}
                              onChange={(value) => {
                                const updated = [...content.home.gallery.works];
                                updated[index] = { ...updated[index], category: value };
                                setContent({
                                  ...content,
                                  home: {
                                    ...content.home,
                                    gallery: {
                                      ...content.home.gallery,
                                      works: updated,
                                    },
                                  },
                                });
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </EditorBlock>
            )}

            {activeTab === "about" && (
              <EditorBlock title="Page à propos" subtitle="Modifier le contenu principal">
                <LocalizedField label="Badge hero" value={content.about.badge} onChange={(value) => setContent({ ...content, about: { ...content.about, badge: value } })} />
                <LocalizedField label="Titre hero" value={content.about.title} onChange={(value) => setContent({ ...content, about: { ...content.about, title: value } })} />
                <LocalizedTextareaField label="Texte hero" value={content.about.introText} onChange={(value) => setContent({ ...content, about: { ...content.about, introText: value } })} />

                <ImageUploadField
                  label="Image fond / image principale"
                  value={content.about.image}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      about: {
                        ...content.about,
                        image: value,
                        profileImage: {
                          ...content.about.profileImage,
                          src: value,
                        },
                      },
                    })
                  }
                />

                <ImageStyleEditor title="Style de l’image profil" value={content.about.profileImage} onChange={(style) => setContent({ ...content, about: { ...content.about, profileImage: style } })} />

                <LocalizedField label="Titre biographie" value={content.about.bioTitle} onChange={(value) => setContent({ ...content, about: { ...content.about, bioTitle: value } })} />
                <LocalizedTextareaField label="Biographie texte 1" value={content.about.bioText1} onChange={(value) => setContent({ ...content, about: { ...content.about, bioText1: value } })} />
                <LocalizedTextareaField label="Biographie texte 2" value={content.about.bioText2} onChange={(value) => setContent({ ...content, about: { ...content.about, bioText2: value } })} />
                <LocalizedField label="Texte bouton CV" value={content.about.cvButtonLabel} onChange={(value) => setContent({ ...content, about: { ...content.about, cvButtonLabel: value } })} />
                <LocalizedField label="Texte bouton parcours" value={content.about.parcoursButtonLabel} onChange={(value) => setContent({ ...content, about: { ...content.about, parcoursButtonLabel: value } })} />
                <LocalizedField label="Badge démarche" value={content.about.visionBadge} onChange={(value) => setContent({ ...content, about: { ...content.about, visionBadge: value } })} />
                <LocalizedField label="Titre démarche" value={content.about.visionTitle} onChange={(value) => setContent({ ...content, about: { ...content.about, visionTitle: value } })} />
                <LocalizedTextareaField label="Texte démarche" value={content.about.visionText} onChange={(value) => setContent({ ...content, about: { ...content.about, visionText: value } })} />
                <LocalizedField label="Badge publications" value={content.about.publicationsBadge} onChange={(value) => setContent({ ...content, about: { ...content.about, publicationsBadge: value } })} />
                <LocalizedField label="Titre publications" value={content.about.publicationsTitle} onChange={(value) => setContent({ ...content, about: { ...content.about, publicationsTitle: value } })} />

                {content.about.publications.map((item, index) => (
                  <div key={`publication-${index}`} className="rounded-[24px] border border-[#ece3dc] bg-[#fcfaf8] p-5">
                    <Field
                      label={`Publication ${index + 1} — année`}
                      value={item.year}
                      onChange={(value) => {
                        const updated = [...content.about.publications];
                        updated[index].year = value;
                        setContent({
                          ...content,
                          about: { ...content.about, publications: updated },
                        });
                      }}
                    />

                    <div className="mt-5">
                      <LocalizedTextareaField
                        label={`Publication ${index + 1} — texte`}
                        value={item.text}
                        onChange={(value) => {
                          const updated = [...content.about.publications];
                          updated[index].text = value;
                          setContent({
                            ...content,
                            about: { ...content.about, publications: updated },
                          });
                        }}
                      />
                    </div>
                  </div>
                ))}

                <LocalizedField label="Badge collections" value={content.about.collectionsBadge} onChange={(value) => setContent({ ...content, about: { ...content.about, collectionsBadge: value } })} />
                <LocalizedField label="Titre collections" value={content.about.collectionsTitle} onChange={(value) => setContent({ ...content, about: { ...content.about, collectionsTitle: value } })} />

                {content.about.collections.map((item, index) => (
                  <div key={`collection-${index}`} className="rounded-[24px] border border-[#ece3dc] bg-[#fcfaf8] p-5">
                    <LocalizedTextareaField
                      label={`Collection ${index + 1}`}
                      value={item.text}
                      onChange={(value) => {
                        const updated = [...content.about.collections];
                        updated[index].text = value;
                        setContent({
                          ...content,
                          about: { ...content.about, collections: updated },
                        });
                      }}
                    />
                  </div>
                ))}

                <LocalizedField label="Badge parcours" value={content.about.parcoursBadge} onChange={(value) => setContent({ ...content, about: { ...content.about, parcoursBadge: value } })} />
                <LocalizedField label="Titre parcours" value={content.about.parcoursTitle} onChange={(value) => setContent({ ...content, about: { ...content.about, parcoursTitle: value } })} />
                <LocalizedField label="Titre expositions" value={content.about.exhibitionsTitle} onChange={(value) => setContent({ ...content, about: { ...content.about, exhibitionsTitle: value } })} />

                {content.about.exhibitions.map((item, index) => (
                  <TimelineLocalizedEditor
                    key={`exhibition-${index}`}
                    title={`Exposition ${index + 1}`}
                    item={item}
                    onChange={(nextItem) => {
                      const updated = [...content.about.exhibitions];
                      updated[index] = nextItem;
                      setContent({
                        ...content,
                        about: { ...content.about, exhibitions: updated },
                      });
                    }}
                  />
                ))}

                <LocalizedField label="Titre formation" value={content.about.formationTitle} onChange={(value) => setContent({ ...content, about: { ...content.about, formationTitle: value } })} />

                {content.about.formations.map((item, index) => (
                  <TimelineLocalizedEditor
                    key={`formation-${index}`}
                    title={`Formation ${index + 1}`}
                    item={item}
                    onChange={(nextItem) => {
                      const updated = [...content.about.formations];
                      updated[index] = nextItem;
                      setContent({
                        ...content,
                        about: { ...content.about, formations: updated },
                      });
                    }}
                  />
                ))}

                <LocalizedField label="Titre distinctions" value={content.about.distinctionsTitle} onChange={(value) => setContent({ ...content, about: { ...content.about, distinctionsTitle: value } })} />

                {content.about.distinctions.map((item, index) => (
                  <TimelineLocalizedEditor
                    key={`distinction-${index}`}
                    title={`Distinction ${index + 1}`}
                    item={item}
                    onChange={(nextItem) => {
                      const updated = [...content.about.distinctions];
                      updated[index] = nextItem;
                      setContent({
                        ...content,
                        about: { ...content.about, distinctions: updated },
                      });
                    }}
                  />
                ))}
              </EditorBlock>
            )}

            {activeTab === "contact" && (
              <EditorBlock title="Page contact" subtitle="Modifier les informations visibles">
                <LocalizedField label="Badge" value={content.contact.badge} onChange={(value) => setContent({ ...content, contact: { ...content.contact, badge: value } })} />
                <LocalizedField label="Titre" value={content.contact.title} onChange={(value) => setContent({ ...content, contact: { ...content.contact, title: value } })} />
                <LocalizedTextareaField label="Texte" value={content.contact.text} onChange={(value) => setContent({ ...content, contact: { ...content.contact, text: value } })} />
                <Field label="Email" value={content.contact.email} onChange={(value) => setContent({ ...content, contact: { ...content.contact, email: value } })} />
                <Field label="Instagram" value={content.contact.instagram} onChange={(value) => setContent({ ...content, contact: { ...content.contact, instagram: value } })} />

                <ImageUploadField
                  label="Image"
                  value={content.contact.contactImage.src}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      contact: {
                        ...content.contact,
                        contactImage: {
                          ...content.contact.contactImage,
                          src: value,
                        },
                      },
                    })
                  }
                />

                <ImageStyleEditor title="Style de l’image contact" value={content.contact.contactImage} onChange={(style) => setContent({ ...content, contact: { ...content.contact, contactImage: style } })} />
              </EditorBlock>
            )}

        
        {activeTab === "oeuvres" && (
  <EditorBlock title="Page œuvres" subtitle="Gestion complète des œuvres">
    <LocalizedField
      label="Titre hero"
      value={content.oeuvres.heroTitle}
      onChange={(value) =>
        setContent({
          ...content,
          oeuvres: { ...content.oeuvres, heroTitle: value },
        })
      }
    />

    <ImageUploadField
      label="Image hero"
      value={content.oeuvres.heroImage}
      onChange={(value) =>
        setContent({
          ...content,
          oeuvres: { ...content.oeuvres, heroImage: value },
        })
      }
    />

    <div className="mt-8">
      <div className="mb-6 flex flex-col gap-4 rounded-[24px] border border-[#ece3dc] bg-[#fcfaf8] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h3 className="text-xl font-medium text-[#201c19]">Œuvres</h3>
          <p className="mt-2 text-sm leading-6 text-[#8a7971]">
            {content.oeuvres.items.length} / {MAX_OEUVRES} œuvres ajoutées.
          </p>
        </div>

        <button
          type="button"
          disabled={content.oeuvres.items.length >= MAX_OEUVRES}
          onClick={() => {
            if (content.oeuvres.items.length >= MAX_OEUVRES) return;

           const newItem = {
  id: Date.now(),
  slug: `nouvelle-oeuvre-${Date.now()}`,
  title: { fr: "", en: "", es: "" },
  year: "2026",
  description: { fr: "", en: "", es: "" },
  technique: { fr: "", en: "", es: "" },
  dimensions: '24 x 24"',
  imageSize: "medium",
  titleSize: "large" as const,

  isAvailable: false,
  availability: {
    fr: "Indisponible",
    en: "Not available",
    es: "No disponible",
  },

  image: "",
  galleryTitle: { fr: "", en: "", es: "" },
  gallerySubtitle: { fr: "", en: "", es: "" },
  galleryImages: [],
};

            setContent({
              ...content,
              oeuvres: {
                ...content.oeuvres,
                items: [...content.oeuvres.items, newItem],
              },
            });
          }}
          className="inline-flex h-[52px] items-center justify-center rounded-full bg-[#191614] px-6 text-[13px] font-medium uppercase tracking-[0.16em] text-white shadow-[0_14px_30px_rgba(0,0,0,0.12)] transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Ajouter une œuvre
        </button>
      </div>

      <div className="space-y-8">
        {content.oeuvres.items.map((item, index) => (
          <div
            key={item.id}
            className="rounded-[24px] border border-[#ece3dc] bg-[#fcfaf8] p-5 sm:p-6"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-xl font-medium text-[#201c19]">
                Œuvre {index + 1}
              </h3>

              <button
                type="button"
                onClick={() => {
                  const updated = [...content.oeuvres.items];
                  updated.splice(index, 1);

                  setContent({
                    ...content,
                    oeuvres: { ...content.oeuvres, items: updated },
                  });
                }}
                className="rounded-full border border-[#e4d8d1] px-4 py-2 text-sm text-[#7c6760] transition hover:bg-white"
              >
                Supprimer
              </button>
            </div>

            <div className="grid gap-5">
              <Field
                label="Slug"
                value={item.slug}
                onChange={(value) => {
                  const updated = [...content.oeuvres.items];
                  updated[index].slug = value;

                  setContent({
                    ...content,
                    oeuvres: { ...content.oeuvres, items: updated },
                  });
                }}
              />

              <LocalizedField
                label="Titre"
                value={item.title}
                onChange={(value) => {
                  const updated = [...content.oeuvres.items];
                  updated[index].title = value;

                  setContent({
                    ...content,
                    oeuvres: { ...content.oeuvres, items: updated },
                  });
                }}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Année"
                  value={item.year}
                  onChange={(value) => {
                    const updated = [...content.oeuvres.items];
                    updated[index].year = value;

                    setContent({
                      ...content,
                      oeuvres: { ...content.oeuvres, items: updated },
                    });
                  }}
                />

                <Field
                  label="Dimensions du cadre"
                  value={item.dimensions}
                  onChange={(value) => {
                    const updated = [...content.oeuvres.items];
                    updated[index].dimensions = value;

                    setContent({
                      ...content,
                      oeuvres: { ...content.oeuvres, items: updated },
                    });
                  }}
                />
              </div>

              <SelectField
                label="Taille de la photo dans le site"
                value={(item as any).imageSize ?? "medium"}
                onChange={(value) => {
                  const updated = [...content.oeuvres.items];
                  (updated[index] as any).imageSize = value;

                  setContent({
                    ...content,
                    oeuvres: { ...content.oeuvres, items: updated },
                  });
                }}
                options={[
                  { label: "Petite", value: "small" },
                  { label: "Moyenne", value: "medium" },
                  { label: "Grande", value: "large" },
                ]}
              />

              <LocalizedField
                label="Technique"
                value={item.technique}
                onChange={(value) => {
                  const updated = [...content.oeuvres.items];
                  updated[index].technique = value;

                  setContent({
                    ...content,
                    oeuvres: { ...content.oeuvres, items: updated },
                  });
                }}
              />

              <ImageUploadField
                label="Image carte"
                value={item.image}
                onChange={(value) => {
                  const updated = [...content.oeuvres.items];
                  updated[index].image = value;

                  setContent({
                    ...content,
                    oeuvres: { ...content.oeuvres, items: updated },
                  });
                }}
              />

              <LocalizedField
                label="Titre page détail"
                value={item.galleryTitle}
                onChange={(value) => {
                  const updated = [...content.oeuvres.items];
                  updated[index].galleryTitle = value;

                  setContent({
                    ...content,
                    oeuvres: { ...content.oeuvres, items: updated },
                  });
                }}
              />

              <SelectField
                label="Grandeur du titre page détail"
                value={(item as any).titleSize ?? "large"}
                onChange={(value) => {
                  const updated = [...content.oeuvres.items];
                  (updated[index] as any).titleSize = value;

                  setContent({
                    ...content,
                    oeuvres: { ...content.oeuvres, items: updated },
                  });
                }}
                options={[
                  { label: "Petite", value: "small" },
                  { label: "Moyenne", value: "medium" },
                  { label: "Grande", value: "large" },
                  { label: "Très grande", value: "xlarge" },
                ]}
              />

              <LocalizedTextareaField
                label="Sous-titre page détail"
                value={item.gallerySubtitle}
                onChange={(value) => {
                  const updated = [...content.oeuvres.items];
                  updated[index].gallerySubtitle = value;

                  setContent({
                    ...content,
                    oeuvres: { ...content.oeuvres, items: updated },
                  });
                }}
              />

              <div className="rounded-[24px] border border-[#ece3dc] bg-white p-5 sm:p-6">
                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-[#201c19]">
                      Images galerie page détail
                    </h4>

                    <p className="mt-2 text-sm text-[#8a7971]">
                      {(((item as any).galleryImages ?? []) as any[]).length} / {MAX_GALLERY_IMAGES} images.
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={(((item as any).galleryImages ?? []) as any[]).length >= MAX_GALLERY_IMAGES}
                    onClick={() => {
                      const updated = [...content.oeuvres.items];
                      const currentImages = (updated[index] as any).galleryImages ?? [];

                      if (currentImages.length >= MAX_GALLERY_IMAGES) return;

                      (updated[index] as any).galleryImages = [
                        ...currentImages,
                        {
                          src: "",
                          isAvailable: false,
                          dimensions: updated[index].dimensions ?? "",
                          availability: {
                            fr: "Indisponible",
                            en: "Not available",
                            es: "No disponible",
                          },
                        },
                      ];

                      setContent({
                        ...content,
                        oeuvres: { ...content.oeuvres, items: updated },
                      });
                    }}
                    className="inline-flex h-[48px] items-center justify-center rounded-full bg-[#191614] px-5 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Ajouter une image
                  </button>
                </div>

                {(((item as any).galleryImages ?? []) as any[]).length > 0 ? (
                  <div className="grid gap-5 sm:grid-cols-2">
                    {(((item as any).galleryImages ?? []) as any[]).map((galleryImage: any, imageIndex: number) => {
                      const imageSrc =
                        typeof galleryImage === "string"
                          ? galleryImage
                          : galleryImage?.src ?? "";

                      const imageAvailable =
                        typeof galleryImage === "string"
                          ? false
                          : galleryImage?.isAvailable === true;

                      return (
                        <div
                          key={`${item.id}-gallery-${imageIndex}`}
                          className="rounded-[22px] border border-[#eadfd8] bg-[#fcfaf8] p-4"
                        >
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <p className="text-sm font-medium text-[#5f534d]">
                              Image galerie {imageIndex + 1}
                            </p>

                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...content.oeuvres.items];
                                const nextImages = [...((updated[index] as any).galleryImages ?? [])];

                                nextImages.splice(imageIndex, 1);
                                (updated[index] as any).galleryImages = nextImages;

                                setContent({
                                  ...content,
                                  oeuvres: { ...content.oeuvres, items: updated },
                                });
                              }}
                              className="rounded-full border border-[#e2d6cf] bg-white px-3 py-1.5 text-xs text-[#7c6760] transition hover:bg-[#faf7f4]"
                            >
                              Supprimer
                            </button>
                          </div>

                          <Field
                            label="Dimensions de cette image"
                            value={
                              typeof galleryImage === "string"
                                ? item.dimensions ?? ""
                                : galleryImage?.dimensions ?? item.dimensions ?? ""
                            }
                            onChange={(value) => {
                              const updated = [...content.oeuvres.items];
                              const nextImages = [...((updated[index] as any).galleryImages ?? [])];
                              const current = nextImages[imageIndex];

                              nextImages[imageIndex] =
                                typeof current === "string"
                                  ? {
                                      src: current,
                                      isAvailable: false,
                                      dimensions: value,
                                      availability: {
                                        fr: "Indisponible",
                                        en: "Not available",
                                        es: "No disponible",
                                      },
                                    }
                                  : {
                                      ...current,
                                      dimensions: value,
                                    };

                              (updated[index] as any).galleryImages = nextImages;

                              setContent({
                                ...content,
                                oeuvres: { ...content.oeuvres, items: updated },
                              });
                            }}
                          />

                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...content.oeuvres.items];
                              const nextImages = [...((updated[index] as any).galleryImages ?? [])];

                              const current = nextImages[imageIndex];
                              const currentSrc =
                                typeof current === "string" ? current : current?.src ?? "";

                              const nextAvailable =
                                typeof current === "string"
                                  ? true
                                  : current?.isAvailable !== true;

                              nextImages[imageIndex] = {
                                src: currentSrc,
                                isAvailable: nextAvailable,
                                dimensions:
                                  typeof current === "string"
                                    ? item.dimensions ?? ""
                                    : current?.dimensions ?? item.dimensions ?? "",
                                availability: nextAvailable
                                  ? {
                                      fr: "Disponible",
                                      en: "Available",
                                      es: "Disponible",
                                    }
                                  : {
                                      fr: "Indisponible",
                                      en: "Not available",
                                      es: "No disponible",
                                    },
                              };

                              (updated[index] as any).galleryImages = nextImages;

                              setContent({
                                ...content,
                                oeuvres: { ...content.oeuvres, items: updated },
                              });
                            }}
                            className={`mb-4 inline-flex h-[44px] items-center justify-center rounded-full px-5 text-[12px] font-medium uppercase tracking-[0.14em] text-white transition ${
                              imageAvailable
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-red-600 hover:bg-red-700"
                            }`}
                          >
                            {imageAvailable ? "Disponible" : "Indisponible"}
                          </button>

                          <ImageUploadField
                            label=""
                            value={imageSrc}
                            onChange={(value) => {
                              const updated = [...content.oeuvres.items];
                              const nextImages = [...((updated[index] as any).galleryImages ?? [])];

                              const current = nextImages[imageIndex];
                              const currentAvailable =
                                typeof current === "string"
                                  ? false
                                  : current?.isAvailable === true;

                              nextImages[imageIndex] = {
                                src: value,
                                isAvailable: currentAvailable,
                                dimensions:
                                  typeof current === "string"
                                    ? item.dimensions ?? ""
                                    : current?.dimensions ?? item.dimensions ?? "",
                                availability: currentAvailable
                                  ? {
                                      fr: "Disponible",
                                      en: "Available",
                                      es: "Disponible",
                                    }
                                  : {
                                      fr: "Indisponible",
                                      en: "Not available",
                                      es: "No disponible",
                                    },
                              };

                              (updated[index] as any).galleryImages = nextImages;

                              setContent({
                                ...content,
                                oeuvres: { ...content.oeuvres, items: updated },
                              });
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-[20px] border border-dashed border-[#ddd1ca] bg-[#fcfaf8] px-5 py-10 text-center">
                    <p className="text-sm font-medium text-[#5f534d]">
                      Aucune image galerie ajoutée.
                    </p>
                    <p className="mt-2 text-sm text-[#8a7971]">
                      Cliquez sur “Ajouter une image” pour commencer.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </EditorBlock>
)}   
 {activeTab === "database" && <DatabaseSection />}
          </section>
        </div>
      </div>
    </main>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mb-3 flex w-full items-center rounded-2xl px-4 py-4 text-left text-[15px] transition ${
        active
          ? "bg-[#191614] text-white"
          : "bg-[#faf7f4] text-[#5f534d] hover:bg-[#f4efea]"
      }`}
    >
      {label}
    </button>
  );
}

function EditorBlock({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[12px] uppercase tracking-[0.35em] text-[#b49686]">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-light tracking-[-0.03em] text-[#191614]">
        {subtitle}
      </h2>

      <div className="mt-8 grid gap-6">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      {label && (
        <label className="mb-3 block text-[15px] font-medium text-[#5f534d]">
          {label}
        </label>
      )}

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[58px] w-full rounded-[18px] border border-[#eadfd8] bg-[#faf8f6] px-5 text-[15px] text-[#1f1b19] outline-none transition focus:border-[#c9afa3] focus:bg-white focus:shadow-[0_0_0_5px_rgba(201,175,163,0.12)]"
      />
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      {label && (
        <label className="mb-3 block text-[15px] font-medium text-[#5f534d]">
          {label}
        </label>
      )}

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className="w-full rounded-[18px] border border-[#eadfd8] bg-[#faf8f6] px-5 py-4 text-[15px] leading-8 text-[#1f1b19] outline-none transition focus:border-[#c9afa3] focus:bg-white focus:shadow-[0_0_0_5px_rgba(201,175,163,0.12)]"
      />
    </div>
  );
}

function LocalizedField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: LocalizedText;
  onChange: (value: LocalizedText) => void;
}) {
  return (
    <div className="rounded-[24px] border border-[#ece3dc] bg-[#fcfaf8] p-5 sm:p-6">
      <h3 className="mb-5 text-lg font-medium text-[#201c19]">{label}</h3>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field
          label="Français"
          value={value?.fr ?? ""}
          onChange={(next) => onChange({ ...value, fr: next })}
        />
        <Field
          label="English"
          value={value?.en ?? ""}
          onChange={(next) => onChange({ ...value, en: next })}
        />
        <Field
          label="Español"
          value={value?.es ?? ""}
          onChange={(next) => onChange({ ...value, es: next })}
        />
      </div>
    </div>
  );
}

function LocalizedTextareaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: LocalizedText;
  onChange: (value: LocalizedText) => void;
}) {
  return (
    <div className="rounded-[24px] border border-[#ece3dc] bg-[#fcfaf8] p-5 sm:p-6">
      <h3 className="mb-5 text-lg font-medium text-[#201c19]">{label}</h3>

      <div className="grid gap-5">
        <TextareaField
          label="Français"
          value={value?.fr ?? ""}
          onChange={(next) => onChange({ ...value, fr: next })}
        />
        <TextareaField
          label="English"
          value={value?.en ?? ""}
          onChange={(next) => onChange({ ...value, en: next })}
        />
        <TextareaField
          label="Español"
          value={value?.es ?? ""}
          onChange={(next) => onChange({ ...value, es: next })}
        />
      </div>
    </div>
  );
}

function TimelineLocalizedEditor({
  title,
  item,
  onChange,
}: {
  title: string;
  item: { year: string; text: LocalizedText };
  onChange: (value: { year: string; text: LocalizedText }) => void;
}) {
  return (
    <div className="rounded-[24px] border border-[#ece3dc] bg-[#fcfaf8] p-5 sm:p-6">
      <h3 className="mb-5 text-lg font-medium text-[#201c19]">{title}</h3>

      <div className="grid gap-5">
        <Field
          label="Année"
          value={item.year}
          onChange={(year) => onChange({ ...item, year })}
        />

        <LocalizedTextareaField
          label="Texte"
          value={item.text}
          onChange={(text) => onChange({ ...item, text })}
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div>
      <label className="mb-3 block text-[15px] font-medium text-[#5f534d]">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[58px] w-full rounded-[18px] border border-[#eadfd8] bg-[#faf8f6] px-5 text-[15px] text-[#1f1b19] outline-none transition focus:border-[#c9afa3] focus:bg-white focus:shadow-[0_0_0_5px_rgba(201,175,163,0.12)]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ImageStyleEditor({
  title,
  value,
  onChange,
}: {
  title: string;
  value: ImageStyle;
  onChange: (value: ImageStyle) => void;
}) {
  return (
    <div className="rounded-[24px] border border-[#ece3dc] bg-[#fcfaf8] p-5 sm:p-6">
      <h3 className="mb-5 text-lg font-medium text-[#201c19]">{title}</h3>

      <div className="grid gap-5">
        <ImageUploadField
          label="Source image"
          value={value.src}
          onChange={(newValue) => onChange({ ...value, src: newValue })}
        />

        <div className="grid gap-5 sm:grid-cols-3">
          <SelectField
            label="Taille"
            value={value.size}
            onChange={(newValue) =>
              onChange({ ...value, size: newValue as ImageStyle["size"] })
            }
            options={[
              { label: "Petite", value: "small" },
              { label: "Moyenne", value: "medium" },
              { label: "Grande", value: "large" },
            ]}
          />

          <SelectField
            label="Forme"
            value={value.shape}
            onChange={(newValue) =>
              onChange({ ...value, shape: newValue as ImageStyle["shape"] })
            }
            options={[
              { label: "Carrée", value: "square" },
              { label: "Arrondie", value: "rounded" },
              { label: "Cercle", value: "circle" },
            ]}
          />

          <SelectField
            label="Position"
            value={value.position}
            onChange={(newValue) =>
              onChange({
                ...value,
                position: newValue as ImageStyle["position"],
              })
            }
            options={[
              { label: "Gauche", value: "left" },
              { label: "Centre", value: "center" },
              { label: "Droite", value: "right" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function getOptimizedImageUrl(url: string) {
  if (!url) return "";

  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    return url.replace("/upload/", "/upload/f_auto,q_auto,w_500/");
  }

  return url;
}

function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setLoading(true);
      const imageUrl = await uploadToCloudinary(file);
      onChange(imageUrl);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l’envoi de l’image vers Cloudinary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {label && (
        <label className="mb-3 block text-[15px] font-medium text-[#5f534d]">
          {label}
        </label>
      )}

      <div className="rounded-[24px] border border-[#eadfd8] bg-[#fcfaf8] p-5 sm:p-6">
        <div className="flex flex-wrap gap-3">
          <label className="inline-flex h-[48px] cursor-pointer items-center justify-center rounded-full border border-[#d9ccc4] bg-white px-5 text-[14px] font-medium text-[#5f534d] transition hover:bg-[#f7f2ee]">
            {loading ? "Importation..." : "Choisir une image"}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex h-[48px] items-center justify-center rounded-full border border-[#e2d6cf] bg-white px-5 text-[14px] font-medium text-[#6d5a53] transition hover:bg-[#faf7f4]"
            >
              Supprimer l’image
            </button>
          )}
        </div>

        {value ? (
          <div className="mt-5">
            <div className="overflow-hidden rounded-[24px] border border-[#eadfd8] bg-white shadow-[0_10px_25px_rgba(0,0,0,0.04)]">
              <img
                src={getOptimizedImageUrl(value)}
                alt="Prévisualisation"
                loading="lazy"
                decoding="async"
                className="h-[170px] w-full object-cover sm:h-[210px]"
              />
            </div>
          </div>
        ) : (
          <div className="mt-5 flex h-[180px] items-center justify-center rounded-[24px] border border-dashed border-[#ddd1ca] bg-white text-center">
            <div className="px-6">
              <p className="text-[15px] font-medium text-[#5f534d]">
                Aucune image sélectionnée
              </p>

              <p className="mt-2 text-sm text-[#8a7971]">
                Importez une image depuis votre ordinateur ou votre téléphone.
              </p>
            </div>
          </div>
        )}

        <p className="mt-4 text-xs leading-6 text-[#8a7971]">
          Formats acceptés : JPG, PNG, WEBP. L’image est envoyée vers Cloudinary.
        </p>
      </div>
    </div>
  );
}
async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Variables Cloudinary manquantes dans .env.local");
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Erreur Cloudinary: ${errorText}`);
  }

  const data = await res.json();

  if (!data.secure_url) {
    throw new Error("Cloudinary n’a pas retourné d’URL.");
  }

  return data.secure_url as string;
}