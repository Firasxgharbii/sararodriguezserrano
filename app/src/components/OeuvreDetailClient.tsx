"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  defaultSiteContent,
  type SiteContent,
  type Lang,
  type LocalizedText,
  LANG_STORAGE_KEY,
} from "../../lib/siteContent";
import { t } from "../../lib/i18n";

function emptyLocalizedText(): LocalizedText {
  return { fr: "", en: "", es: "" };
}

function getSafeSlug(value?: string) {
  return (value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isValidImageUrl(url?: string) {
  if (!url) return false;

  const clean = url.trim();

  if (!clean) return false;
  if (clean === "undefined") return false;
  if (clean === "null") return false;
  if (clean.startsWith("blob:")) return false;

  return clean.startsWith("http") || clean.startsWith("/");
}

function getOptimizedImageUrl(url: string) {
  if (!url) return "";

  const clean = url.trim();

  if (clean.includes("res.cloudinary.com") && clean.includes("/upload/")) {
    return clean.replace("/upload/", "/upload/f_auto,q_auto,w_1200,c_limit/");
  }

  return clean;
}

function mergeSiteContent(data: Partial<SiteContent> | null): SiteContent {
  if (!data) return defaultSiteContent;

  return {
    ...defaultSiteContent,
    ...data,
    oeuvres: {
      ...defaultSiteContent.oeuvres,
      ...(data.oeuvres ?? {}),
      items: data.oeuvres?.items ?? defaultSiteContent.oeuvres.items,
    },
  };
}

export default function OeuvreDetailClient({ slug }: { slug: string }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [ready, setReady] = useState(false);
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/site-content", {
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          setContent(mergeSiteContent(data));
        } else {
          setContent(defaultSiteContent);
        }
      } catch (error) {
        console.error("Erreur chargement œuvre:", error);
        setContent(defaultSiteContent);
      }

      const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;

      setLang(
        savedLang === "fr" || savedLang === "en" || savedLang === "es"
          ? savedLang
          : "fr"
      );

      setReady(true);
    };

    loadData();
    window.addEventListener("focus", loadData);

    return () => window.removeEventListener("focus", loadData);
  }, []);

  const oeuvre = useMemo(() => {
    const currentSlug = getSafeSlug(slug);

    return content.oeuvres.items.find((item) => {
      const slugFromDb = getSafeSlug(item.slug);
      const titleFr = getSafeSlug(item.title?.fr);
      const titleEn = getSafeSlug(item.title?.en);
      const titleEs = getSafeSlug(item.title?.es);
      const galleryTitleFr = getSafeSlug(item.galleryTitle?.fr);
      const galleryTitleEn = getSafeSlug(item.galleryTitle?.en);
      const galleryTitleEs = getSafeSlug(item.galleryTitle?.es);

      return (
        slugFromDb === currentSlug ||
        titleFr === currentSlug ||
        titleEn === currentSlug ||
        titleEs === currentSlug ||
        galleryTitleFr === currentSlug ||
        galleryTitleEn === currentSlug ||
        galleryTitleEs === currentSlug
      );
    });
  }, [content, slug]);

  if (!ready) return null;

  if (!oeuvre) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-[#ecebea] px-6 py-24 text-center text-[#8b7771]">
          <p className="text-sm uppercase tracking-[0.24em]">
            Cette œuvre n’est pas encore configurée.
          </p>

          <Link
            href="/oeuvres"
            className="mt-8 inline-block text-xs uppercase tracking-[0.24em] underline"
          >
            ← Retour aux œuvres
          </Link>
        </main>

        <Footer />
      </>
    );
  }

  const title = t(oeuvre.galleryTitle, lang) || t(oeuvre.title, lang);
  const subtitle =
    t(oeuvre.gallerySubtitle, lang) || t(oeuvre.description, lang);

  const technique = t(oeuvre.technique, lang) || "Non précisé";

  const galleryImages = ((oeuvre.galleryImages ?? []) as any[])
    .map((img) => {
      if (typeof img === "string") {
        return {
          src: img,
          title: oeuvre.title,
          isAvailable: false,
          dimensions: oeuvre.dimensions || "",
        };
      }

      return {
        src: img?.src ?? "",
        title: img?.title ?? oeuvre.title ?? emptyLocalizedText(),
        isAvailable: img?.isAvailable === true,
        dimensions: img?.dimensions || oeuvre.dimensions || "",
      };
    })
    .filter((img) => isValidImageUrl(img.src));

  const imagesToShow =
    galleryImages.length > 0
      ? galleryImages
      : isValidImageUrl(oeuvre.image)
      ? [
          {
            src: oeuvre.image,
            title: oeuvre.title,
            isAvailable: false,
            dimensions: oeuvre.dimensions || "",
          },
        ]
      : [];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#ecebea] text-[#7f6e67]">
        <section className="mx-auto max-w-[1280px] px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.95fr_0.7fr] md:items-start">
            <div>
              <h1 className="font-light leading-[1.15] tracking-[0.08em] text-[#8b7771] text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px]">
                {title}
              </h1>
            </div>

            <div className="ml-auto flex w-full max-w-[430px] flex-col items-end text-right md:pt-6">
              {subtitle && (
                <div className="border-r border-[#c9b9b2] pr-6">
                  <p className="text-[14px] font-light leading-[1.9] tracking-[0.08em] text-[#8f766d] md:text-[15px]">
                    {subtitle}
                  </p>
                </div>
              )}

              <Link
                href="/oeuvres"
                className="mt-9 inline-flex items-center justify-end gap-3 text-[11px] uppercase tracking-[0.28em] text-[#9b847b] transition-opacity duration-300 hover:opacity-70"
              >
                <span>←</span>
                Retour aux œuvres
              </Link>
            </div>
          </div>

          {imagesToShow.length > 0 ? (
            <div className="mt-20 grid grid-cols-1 gap-x-20 gap-y-28 sm:grid-cols-2">
              {imagesToShow.map((image, index) => {
                const imageTitle = t(image.title, lang) || title;
                const imageDimensions =
                  image.dimensions || oeuvre.dimensions || "Non précisé";

                const availabilityText = image.isAvailable
                  ? lang === "en"
                    ? "Available"
                    : "Disponible"
                  : lang === "en"
                  ? "Not available"
                  : lang === "es"
                  ? "No disponible"
                  : "Indisponible";

                return (
                  <article key={`${slug}-${index}`} className="group">
                    <div className="mx-auto max-w-[560px] overflow-hidden bg-white shadow-[0_16px_45px_rgba(0,0,0,0.06)]">
                      <Image
                        src={getOptimizedImageUrl(image.src)}
                        alt={`${imageTitle} ${index + 1}`}
                        width={1400}
                        height={1800}
                        unoptimized
                        loading={index < 2 ? "eager" : "lazy"}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.015]"
                      />
                    </div>

                    <div className="mt-6 border-t border-[#d6ccc7] pt-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h2 className="text-[11px] uppercase tracking-[0.24em] text-[#6f625d]">
                            {imageTitle}
                          </h2>

                          <div className="mt-4 grid gap-2 text-[13px] leading-7 text-[#8d7d76]">
                            <p>
                              <span className="uppercase tracking-[0.18em] text-[#6f625d]">
                                Dimensions :
                              </span>{" "}
                              {imageDimensions}
                            </p>

                            <p>
                              <span className="uppercase tracking-[0.18em] text-[#6f625d]">
                                Année :
                              </span>{" "}
                              {oeuvre.year || "Non précisé"}
                            </p>

                            <p>
                              <span className="uppercase tracking-[0.18em] text-[#6f625d]">
                                Technique :
                              </span>{" "}
                              {technique}
                            </p>
                          </div>
                        </div>

                        <div className="inline-flex w-fit items-center rounded-full border border-[#cfc4bf] bg-[#e6e2df] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#7f6e67]">
                          <span className="mr-2 h-2 w-2 rounded-full bg-[#8b7771]" />
                          {availabilityText}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-20 rounded-[28px] border border-dashed border-[#d8ccc7] bg-white/40 px-6 py-16 text-center">
              <p className="text-[13px] uppercase tracking-[0.24em] text-[#8b7771]">
                Aucune image disponible pour cette œuvre.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}