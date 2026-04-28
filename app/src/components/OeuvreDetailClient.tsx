"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  defaultSiteContent,
  SiteContent,
  STORAGE_KEY,
  Lang,
  LANG_STORAGE_KEY,
} from "../../lib/siteContent";
import { t } from "../../lib/i18n";

type ParsedSiteContent = Partial<SiteContent> & {
  home?: Partial<SiteContent["home"]>;
  about?: Partial<SiteContent["about"]>;
  contact?: Partial<SiteContent["contact"]>;
  oeuvres?: Partial<SiteContent["oeuvres"]> & {
    items?: any[];
  };
};

function isAvailable(value: string) {
  const text = value.toLowerCase().trim();

  return (
    text.includes("disponible") ||
    text.includes("available") ||
    text.includes("disponibilidad")
  );
}

export default function OeuvreDetailClient({ slug }: { slug: string }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [ready, setReady] = useState(false);
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const loadData = () => {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (!stored) {
        setContent(defaultSiteContent);
      } else {
        try {
          const parsed: ParsedSiteContent = JSON.parse(stored);

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
            },

            about: {
              ...defaultSiteContent.about,
              ...(parsed.about ?? {}),
              profileImage: {
                ...defaultSiteContent.about.profileImage,
                ...(parsed.about?.profileImage ?? {}),
              },
              publications:
                parsed.about?.publications ??
                defaultSiteContent.about.publications,
              collections:
                parsed.about?.collections ??
                defaultSiteContent.about.collections,
              exhibitions:
                parsed.about?.exhibitions ??
                defaultSiteContent.about.exhibitions,
              formations:
                parsed.about?.formations ??
                defaultSiteContent.about.formations,
              distinctions:
                parsed.about?.distinctions ??
                defaultSiteContent.about.distinctions,
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
              items: (
                parsed.oeuvres?.items ?? defaultSiteContent.oeuvres.items
              ).map((item: any, index: number) => ({
                ...(defaultSiteContent.oeuvres.items[index] ?? {}),
                ...item,
                galleryImages:
                  item?.galleryImages ??
                  defaultSiteContent.oeuvres.items[index]?.galleryImages ??
                  [],
              })),
            },
          });
        } catch {
          setContent(defaultSiteContent);
        }
      }

      const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;

      if (savedLang === "fr" || savedLang === "en" || savedLang === "es") {
        setLang(savedLang);
      } else {
        setLang("fr");
      }

      setReady(true);
    };

    loadData();

    window.addEventListener("focus", loadData);
    window.addEventListener("storage", loadData);

    return () => {
      window.removeEventListener("focus", loadData);
      window.removeEventListener("storage", loadData);
    };
  }, []);

  const oeuvre = useMemo(() => {
    return content.oeuvres.items.find((item) => item.slug === slug);
  }, [content, slug]);

  if (!ready) return null;
  if (!oeuvre) notFound();

  const title = t(oeuvre.galleryTitle, lang) || t(oeuvre.title, lang);
  const subtitle =
    t(oeuvre.gallerySubtitle, lang) || t(oeuvre.description, lang);
  const technique = t(oeuvre.technique, lang);
  const availabilityText = t(oeuvre.availability, lang);
  const available = isAvailable(availabilityText);

  const galleryImages = (oeuvre.galleryImages ?? []).filter(
    (img) => typeof img === "string" && img.trim() !== ""
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#ecebea] text-[#7f6e67]">
        <section className="mx-auto max-w-[1280px] px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.95fr_0.7fr] md:items-start">
            <div>
              <p className="futura-text mb-5 text-[11px] uppercase tracking-[0.35em] text-[#b9a29a]">
                Œuvre
              </p>

              <h1 className="futura-text max-w-[620px] text-[34px] font-light leading-[1.15] tracking-[0.16em] text-[#8b7771] md:text-[58px]">
                {title}
              </h1>
            </div>

            <div className="md:pt-3">
              {subtitle && (
                <p className="text-[16px] leading-8 text-[#a28f87]">
                  {subtitle}
                </p>
              )}

              <div className="mt-8">
                <Link
                  href="/oeuvres"
                  className="futura-text inline-flex items-center text-[12px] uppercase tracking-[0.25em] text-[#9b847b] transition-opacity duration-300 hover:opacity-70"
                >
                  ← Retour aux œuvres
                </Link>
              </div>
            </div>
          </div>

          {galleryImages.length > 0 && (
            <div className="mt-24 grid grid-cols-1 gap-x-20 gap-y-24 sm:grid-cols-2">
              {galleryImages.map((image, index) => (
                <article key={`${oeuvre.slug}-${index}`} className="group">
                  <div className="overflow-hidden bg-white">
                    <Image
                      src={image}
                      alt={`${title} ${index + 1}`}
                      width={1400}
                      height={1800}
                      className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.015]"
                    />
                  </div>

                  <div className="mt-6 border-t border-[#d9d2ce] pt-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="futura-text max-w-[520px] text-[17px] uppercase tracking-[0.22em] text-[#7d6d67]">
                          {title}
                        </h2>

                        <div className="mt-4 grid gap-2 text-[14px] leading-7 text-[#97867f]">
                          {oeuvre.year && (
                            <p>
                              <span className="futura-text uppercase tracking-[0.18em] text-[#7c6b65]">
                                Année :
                              </span>{" "}
                              {oeuvre.year}
                            </p>
                          )}

                          {technique && (
                            <p>
                              <span className="futura-text uppercase tracking-[0.18em] text-[#7c6b65]">
                                Technique :
                              </span>{" "}
                              {technique}
                            </p>
                          )}

                          {oeuvre.dimensions && (
                            <p>
                              <span className="futura-text uppercase tracking-[0.18em] text-[#7c6b65]">
                                Dimensions :
                              </span>{" "}
                              {oeuvre.dimensions}
                            </p>
                          )}
                        </div>
                      </div>

                      {availabilityText && (
                        <div
                          className={`futura-text inline-flex w-fit items-center rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.22em] ${
                            available
                              ? "border-green-600/30 bg-green-50 text-green-700"
                              : "border-red-600/30 bg-red-50 text-red-700"
                          }`}
                        >
                          <span
                            className={`mr-2 h-2 w-2 rounded-full ${
                              available ? "bg-green-600" : "bg-red-600"
                            }`}
                          />
                          {availabilityText}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-16 flex justify-end">
            <Link
              href="/oeuvres"
              className="futura-text inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.25em] text-[#b09086] transition-opacity duration-300 hover:opacity-70"
            >
              Retour
              <span className="text-lg">›</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        @font-face {
          font-family: "FuturaLightCustom";
          src: url("/fonts/Futura-Light.woff2") format("woff2");
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }

        .futura-text {
          font-family: "FuturaLightCustom", "Futura W02 Light", "Futura PT",
            "Futura", "Avenir Next", "Helvetica Neue", Arial, sans-serif;
          font-weight: 300;
        }
      `}</style>
    </>
  );
}