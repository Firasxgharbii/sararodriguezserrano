"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  defaultSiteContent,
  type SiteContent,
  type Lang,
  LANG_STORAGE_KEY,
} from "../../lib/siteContent";
import { t } from "../../lib/i18n";

function mergeSiteContent(parsed: Partial<SiteContent> | null): SiteContent {
  if (!parsed) return defaultSiteContent;

  return {
    ...defaultSiteContent,
    ...parsed,
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
  };
}

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
    const loadData = async () => {
      try {
        const res = await fetch("/api/site-content", {
          cache: "no-store",
        });

        if (!res.ok) {
          setContent(defaultSiteContent);
        } else {
          const data = await res.json();
          setContent(mergeSiteContent(data));
        }
      } catch (err) {
        console.error("Erreur Aiven:", err);
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
    return content.oeuvres.items.find((item) => item.slug === slug);
  }, [content, slug]);

  if (!ready) return null;
  if (!oeuvre) notFound();

  const title = t(oeuvre.galleryTitle, lang) || t(oeuvre.title, lang);
  const subtitle =
    t(oeuvre.gallerySubtitle, lang) || t(oeuvre.description, lang);

  const technique = t(oeuvre.technique, lang);
  const availabilityText = t(oeuvre.availability, lang);
  const available = availabilityText ? isAvailable(availabilityText) : false;

  const galleryImages = (oeuvre.galleryImages ?? []).filter(
    (img) => typeof img === "string" && img.trim() !== ""
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#ecebea] text-[#7f6e67]">
        <section className="mx-auto max-w-[1280px] px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.95fr_0.7fr] md:items-start">
            <div>
              <h1 className="futura-text max-w-[620px] text-[28px] font-light leading-[1.08] tracking-[0.14em] text-[#8b7771] sm:text-[36px] md:text-[44px] lg:text-[50px]">
                {title}
              </h1>
            </div>

            <div className="ml-auto flex w-full max-w-[430px] flex-col items-end text-right md:pt-8">
              {subtitle && (
                <div className="border-r border-[#c9b9b2] pr-6">
                  <p className="serif-text text-[20px] font-light italic leading-[1.7] tracking-[0.01em] text-[#8f766d] md:text-[23px]">
                    {subtitle}
                  </p>
                </div>
              )}

              <div className="mt-9">
                <Link
                  href="/oeuvres"
                  className="futura-text inline-flex items-center justify-end gap-3 text-[12px] uppercase tracking-[0.28em] text-[#9b847b] transition-opacity duration-300 hover:opacity-70"
                >
                  <span>←</span>
                  Retour aux œuvres
                </Link>
              </div>
            </div>
          </div>

          {galleryImages.length > 0 && (
            <div className="mt-24 grid grid-cols-1 gap-x-20 gap-y-28 sm:grid-cols-2">
              {galleryImages.map((image, index) => (
                <article key={`${oeuvre.slug}-${index}`} className="group">
                  <div className="mb-6 border-t border-[#d6ccc7] pt-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="futura-text text-[15px] uppercase tracking-[0.22em] text-[#6f625d]">
                          {title}
                        </h2>

                        <div className="mt-4 grid gap-2 text-[14px] leading-7 text-[#8d7d76]">
                          {oeuvre.dimensions && (
                       <p>
  <span className="futura-text uppercase tracking-[0.18em] text-[#6f625d]">
    Dimensions :
  </span>{" "}
  {oeuvre.dimensions || "Non précisé"}
</p>
                          )}

                          {oeuvre.year && (
                           <p>
  <span className="futura-text uppercase tracking-[0.18em] text-[#6f625d]">
    Année :
  </span>{" "}
  {oeuvre.year || "Non précisé"}
</p>
                          )}

                          {technique && (
                            <p>
                              <span className="futura-text uppercase tracking-[0.18em] text-[#6f625d]">
                                Technique :
                              </span>{" "}
                              {technique}
                            </p>
                          )}
                        </div>
                      </div>

                      {availabilityText && (
                        <div
                          className={`futura-text inline-flex w-fit items-center rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.2em] ${
                            available
                              ? "border-green-600/25 bg-green-50 text-green-700"
                              : "border-red-600/25 bg-red-50 text-red-700"
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

                  <div className="overflow-hidden bg-white shadow-[0_16px_45px_rgba(0,0,0,0.06)]">
                    <Image
                      src={image}
                      alt={`${title} ${index + 1}`}
                      width={1400}
                      height={1800}
                      className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.015]"
                    />
                  </div>
                </article>
              ))}
            </div>
          )}
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

        .serif-text {
          font-family: "Cormorant Garamond", "Playfair Display", Georgia, serif;
        }
      `}</style>
    </>
  );
}