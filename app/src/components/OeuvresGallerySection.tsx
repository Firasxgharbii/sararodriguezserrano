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
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
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
      } catch (error) {
        console.error("Erreur chargement Aiven:", error);
        setContent(defaultSiteContent);
      }

      const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;

      if (savedLang === "fr" || savedLang === "en" || savedLang === "es") {
        setLang(savedLang);
      } else {
        setLang("fr");
      }
    };

    loadData();

    window.addEventListener("focus", loadData);

    return () => {
      window.removeEventListener("focus", loadData);
    };
  }, []);

  const items = content.oeuvres.items.filter(
    (item) => t(item.title, lang)?.trim() || item.image?.trim()
  );

  return (
    <section
      id="gallery"
      className="mx-auto max-w-[1550px] px-8 pb-20 pt-24 md:px-12 md:pb-28 md:pt-28 lg:px-16 lg:pt-32"
    >
      <div className="grid grid-cols-1 gap-x-24 gap-y-24 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-28">
        {items.map((oeuvre) => (
          <Link
            key={oeuvre.id}
            href={`/oeuvres/${oeuvre.slug}`}
            className="group mx-auto block w-full max-w-[460px]"
          >
            <div className="relative aspect-[1/1] w-full overflow-hidden bg-[#e8e4df]">
              <Image
                src={oeuvre.image || "/5312.jpg"}
                alt={t(oeuvre.title, lang) || "Œuvre"}
                fill
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
        ))}
      </div>
    </section>
  );
}