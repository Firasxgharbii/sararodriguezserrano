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

function getSafeSlug(slug?: string) {
  return (slug || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getOptimizedImageUrl(url: string) {
  if (!url) return "";

  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    return url.replace("/upload/", "/upload/f_auto,q_auto,w_1200,c_limit/");
  }

  return url;
}

function mergeSiteContent(parsed: Partial<SiteContent> | null): SiteContent {
  if (!parsed) return defaultSiteContent;

  return {
    ...defaultSiteContent,
    ...parsed,
    oeuvres: {
      ...defaultSiteContent.oeuvres,
      ...(parsed.oeuvres ?? {}),
      items: (parsed.oeuvres?.items ?? defaultSiteContent.oeuvres.items).map(
        (item: any, index: number) => ({
          ...(defaultSiteContent.oeuvres.items[index] ?? {}),
          ...item,
          imageSize: item?.imageSize ?? "medium",
          titleSize: item?.titleSize ?? "large",
          galleryImages:
            item?.galleryImages ??
            defaultSiteContent.oeuvres.items[index]?.galleryImages ??
            [],
        })
      ),
    },
  };
}

function getArtworkImageClass(size?: string) {
  switch (size) {
    case "small":
      return "max-w-[420px]";
    case "large":
      return "max-w-[760px]";
    case "medium":
    default:
      return "max-w-[560px]";
  }
}

function getTitleSizeClass(size?: string) {
  switch (size) {
    case "small":
      return "max-w-3xl text-[34px] sm:text-[42px] md:text-[48px] lg:text-[54px]";
    case "medium":
      return "max-w-4xl text-[40px] sm:text-[50px] md:text-[58px] lg:text-[62px]";
    case "xlarge":
      return "max-w-6xl text-[52px] sm:text-[66px] md:text-[78px] lg:text-[88px]";
    case "large":
    default:
      return "max-w-5xl text-[46px] sm:text-[58px] md:text-[64px] lg:text-[68px]";
  }
}

function getArtworkAspectRatio(dimensions?: string) {
  if (!dimensions) return "1 / 1";

  const cleaned = dimensions
    .toLowerCase()
    .replaceAll(",", ".")
    .replaceAll("×", "x")
    .replaceAll("*", "x")
    .replaceAll(" by ", "x")
    .replaceAll("par", "x");

  const match = cleaned.match(/(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)/);

  if (!match) return "1 / 1";

  const width = Number(match[1]);
  const height = Number(match[2]);

  if (!width || !height) return "1 / 1";

  return `${width} / ${height}`;
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
    return content.oeuvres.items.find(
      (item) => getSafeSlug(item.slug) === getSafeSlug(slug)
    );
  }, [content, slug]);

  if (!ready) return null;
  if (!oeuvre) notFound();

  const title = t(oeuvre.galleryTitle, lang) || t(oeuvre.title, lang);
  const subtitle =
    t(oeuvre.gallerySubtitle, lang) || t(oeuvre.description, lang);

  const technique = t(oeuvre.technique, lang) || "Non précisé";

  const galleryImages = (oeuvre.galleryImages ?? [])
    .map((img: any) => {
      if (typeof img === "string") {
        return {
          src: img,
          isAvailable: false,
          dimensions: oeuvre.dimensions || "",
        };
      }

      return {
        src: img?.src ?? "",
        isAvailable: img?.isAvailable === true,
        dimensions: img?.dimensions || oeuvre.dimensions || "",
      };
    })
    .filter((img: any) => img.src?.trim() !== "");

  const imagesToShow =
    galleryImages.length > 0
      ? galleryImages
      : oeuvre.image
      ? [
          {
            src: oeuvre.image,
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
              <h1
                className={`futura-text font-light leading-[1.18] tracking-[0.14em] text-[#8b7771] ${getTitleSizeClass(
                  (oeuvre as any).titleSize
                )}`}
              >
                {title}
              </h1>
            </div>

            <div className="ml-auto flex w-full max-w-[430px] flex-col items-end text-right md:pt-6">
              {subtitle && (
                <div className="border-r border-[#c9b9b2] pr-6">
                  <p className="futura-text text-[14px] font-light leading-[1.9] tracking-[0.08em] text-[#8f766d] md:text-[15px]">
                    {subtitle}
                  </p>
                </div>
              )}

              <div className="mt-9">
                <Link
                  href="/oeuvres"
                  className="futura-text inline-flex items-center justify-end gap-3 text-[11px] uppercase tracking-[0.28em] text-[#9b847b] transition-opacity duration-300 hover:opacity-70"
                >
                  <span>←</span>
                  Retour aux œuvres
                </Link>
              </div>
            </div>
          </div>

          {imagesToShow.length > 0 && (
            <div className="mt-20 grid grid-cols-1 gap-x-20 gap-y-28 sm:grid-cols-2">
              {imagesToShow.map((galleryImage: any, index: number) => {
                const available = galleryImage.isAvailable === true;

                const availabilityText = available
                  ? lang === "en"
                    ? "Available"
                    : "Disponible"
                  : lang === "en"
                  ? "Not available"
                  : lang === "es"
                  ? "No disponible"
                  : "Indisponible";

                const imageDimensions =
                  galleryImage.dimensions || oeuvre.dimensions || "Non précisé";

                return (
                  <article key={`${oeuvre.slug}-${index}`} className="group">
                    <div
                      className={`mx-auto overflow-hidden bg-white shadow-[0_16px_45px_rgba(0,0,0,0.06)] ${getArtworkImageClass(
                        (oeuvre as any).imageSize
                      )}`}
                      style={{
                        aspectRatio: getArtworkAspectRatio(imageDimensions),
                      }}
                    >
                      <Image
                        src={getOptimizedImageUrl(galleryImage.src)}
                        alt={`${title} ${index + 1}`}
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
                          <h2 className="futura-text text-[11px] uppercase tracking-[0.24em] text-[#6f625d]">
                            {title}
                          </h2>

                          <div className="mt-4 grid gap-2 text-[13px] leading-7 text-[#8d7d76]">
                            <p>
                              <span className="futura-text uppercase tracking-[0.18em] text-[#6f625d]">
                                Dimensions :
                              </span>{" "}
                              {imageDimensions}
                            </p>

                            <p>
                              <span className="futura-text uppercase tracking-[0.18em] text-[#6f625d]">
                                Année :
                              </span>{" "}
                              {oeuvre.year || "Non précisé"}
                            </p>

                            <p>
                              <span className="futura-text uppercase tracking-[0.18em] text-[#6f625d]">
                                Technique :
                              </span>{" "}
                              {technique}
                            </p>
                          </div>
                        </div>

                        <div className="futura-text inline-flex w-fit items-center rounded-full border border-[#cfc4bf] bg-[#e6e2df] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#7f6e67]">
                          <span className="mr-2 h-2 w-2 rounded-full bg-[#8b7771]" />
                          {availabilityText}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
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
      `}</style>
    </>
  );
}