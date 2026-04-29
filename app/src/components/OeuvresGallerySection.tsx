"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  defaultSiteContent,
  type SiteContent,
  type Lang,
  LANG_STORAGE_KEY,
} from "../../lib/siteContent";
import { t } from "../../lib/i18n";

function getOptimizedImageUrl(url: string) {
  if (!url) return "";

  const cleanUrl = url.trim();

  if (cleanUrl.includes("res.cloudinary.com") && cleanUrl.includes("/upload/")) {
    return cleanUrl.replace("/upload/", "/upload/f_auto,q_auto,w_900,c_limit/");
  }

  return cleanUrl;
}

function getSafeSlug(slug?: string) {
  return (slug || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isValidImageUrl(url?: string) {
  if (!url) return false;

  const cleanUrl = url.trim();

  if (!cleanUrl) return false;
  if (cleanUrl === "undefined") return false;
  if (cleanUrl === "null") return false;
  if (cleanUrl.startsWith("blob:")) return false;

  return cleanUrl.startsWith("http") || cleanUrl.startsWith("/");
}

function mergeSiteContent(parsed: Partial<SiteContent> | null): SiteContent {
  if (!parsed) return defaultSiteContent;

  return {
    ...defaultSiteContent,
    ...parsed,
    oeuvres: {
      ...defaultSiteContent.oeuvres,
      ...(parsed.oeuvres ?? {}),
      items: parsed.oeuvres?.items ?? defaultSiteContent.oeuvres.items,
    },
  };
}

export default function OeuvresGallerySection() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [lang, setLang] = useState<Lang>("fr");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/site-content", {
          cache: "no-store",
        });

        if (!res.ok) {
          setContent(defaultSiteContent);
        } else {
          const data = await res.json();
          setContent(mergeSiteContent(data));
        }
      } catch (error) {
        console.error("Erreur chargement Aiven:", error);
        setContent(defaultSiteContent);
      } finally {
        const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;

        setLang(
          savedLang === "fr" || savedLang === "en" || savedLang === "es"
            ? savedLang
            : "fr"
        );

        setLoading(false);
      }
    };

    loadData();

    window.addEventListener("focus", loadData);

    return () => window.removeEventListener("focus", loadData);
  }, []);

  if (loading || !content) {
    return (
      <section className="mx-auto max-w-[1550px] px-8 pb-20 pt-24 md:px-12 md:pb-28 md:pt-28 lg:px-16 lg:pt-32">
        <div className="grid grid-cols-1 gap-x-24 gap-y-24 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-28">
          {[1, 2, 3].map((item) => (
            <div key={item} className="mx-auto w-full max-w-[460px]">
              <div className="aspect-[1/1] w-full animate-pulse bg-[#e8e4df]" />
              <div className="mt-5 h-5 w-48 animate-pulse bg-[#e8e4df]" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  const items = content.oeuvres.items.filter((item) => {
    const hasTitle = t(item.title, lang)?.trim();
    const hasImage = isValidImageUrl(item.image);

    return hasTitle || hasImage;
  });

  return (
    <section
      id="gallery"
      className="mx-auto max-w-[1550px] px-8 pb-20 pt-24 md:px-12 md:pb-28 md:pt-28 lg:px-16 lg:pt-32"
    >
      <div className="grid grid-cols-1 gap-x-24 gap-y-24 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-28">
        {items.map((oeuvre, index) => {
          const safeSlug = getSafeSlug(oeuvre.slug);
          const imageSrc = isValidImageUrl(oeuvre.image)
            ? getOptimizedImageUrl(oeuvre.image)
            : "/5312.jpg";

          return (
            <Link
              key={oeuvre.id}
              href={`/oeuvres/${safeSlug}`}
              className="group mx-auto block w-full max-w-[460px]"
              prefetch={false}
            >
              <div className="relative aspect-[1/1] w-full overflow-hidden bg-[#e8e4df]">
                <Image
                  src={imageSrc}
                  alt={t(oeuvre.title, lang) || "Œuvre"}
                  fill
                  unoptimized
                  priority={index < 3}
                  loading={index < 3 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="pt-5">
                <h2 className="text-[17px] font-light tracking-[0.20em] text-[#8a7d76] transition-colors duration-300 group-hover:text-[#5d524b] md:text-[19px]">
                  {t(oeuvre.title, lang)}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}