"use client";

import Image from "next/image";
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

  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    return url.replace("/upload/", "/upload/f_auto,q_auto,w_1400,c_limit/");
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
      items: parsed.oeuvres?.items ?? defaultSiteContent.oeuvres.items,
    },
  };
}

export default function OeuvresQuoteSection() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/site-content", {
          cache: "no-store",
        });

        const data = await res.json();

        if (data) {
          setContent(mergeSiteContent(data));
        } else {
          setContent(defaultSiteContent);
        }
      } catch (error) {
        console.error("Erreur chargement contenu Aiven:", error);
        setContent(defaultSiteContent);
      }

      const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;

      setLang(
        savedLang === "fr" || savedLang === "en" || savedLang === "es"
          ? savedLang
          : "fr"
      );
    };

    loadData();
    window.addEventListener("focus", loadData);

    return () => {
      window.removeEventListener("focus", loadData);
    };
  }, []);

  const oeuvres = content.oeuvres;
  const quoteImage = getOptimizedImageUrl(
    oeuvres.quoteImage || "/IMAGE Grande.jpg"
  );

  return (
    <section className="w-full bg-[#f7f4f3]">
      <div className="grid min-h-[720px] grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[420px] lg:min-h-[720px]">
          <Image
            src={quoteImage}
            alt={t(oeuvres.quoteAuthor, lang) || "Artiste en train de peindre"}
            fill
            unoptimized
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-white/20" />
          <div className="absolute bottom-10 left-6 h-40 w-24 rounded-full bg-[#f3cfc9]/40 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-56 w-32 rounded-full bg-white/50 blur-3xl" />
          <div className="absolute bottom-0 right-10 h-52 w-24 rounded-full bg-white/60 blur-3xl" />
        </div>

        <div className="flex items-center bg-[#f7f4f3] px-8 py-16 md:px-16 lg:px-20">
          <div className="max-w-[430px]">
            <div className="mb-6 text-[90px] leading-none text-[#ead9d8] md:text-[110px]">
              “
            </div>

            <p className="text-[22px] leading-[1.85] tracking-[0.16em] text-[#9b8b88] md:text-[26px]">
              {t(oeuvres.quoteText, lang)}
            </p>

            <p className="mt-10 text-[18px] tracking-[0.14em] text-[#a79592] md:text-[20px]">
              {t(oeuvres.quoteAuthor, lang)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}