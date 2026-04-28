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

const futuraLight = {
  fontFamily:
    '"FuturaLightCustom", "Futura W02 Light", "Futura PT", Futura, "Avenir Next", "Helvetica Neue", Arial, sans-serif',
  fontWeight: 300,
};

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

export default function OeuvresIntroSection() {
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

  const oeuvres = content.oeuvres;

  return (
    <section className="relative w-full overflow-hidden bg-[#f7f4f3]">
      <div className="absolute inset-0">
        <Image
          src={oeuvres.heroImage || "/5312.jpg"}
          alt={t(oeuvres.heroTitle, lang) || "Collections de peinture à l’huile"}
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[1.18] contrast-[0.9] saturate-[0.92]"
        />
      </div>

      <div className="absolute inset-0 bg-white/28" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/20" />

      <div className="relative mx-auto flex min-h-[430px] max-w-6xl items-center justify-center px-6 py-20 text-center md:min-h-[540px] md:px-10 md:py-28 lg:py-32">
        <div className="max-w-5xl">
          <h1
            className="mx-auto max-w-4xl text-[28px] lowercase leading-[1.25] tracking-[0.12em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.22)] md:text-[42px] lg:text-[52px]"
            style={futuraLight}
          >
            {t(oeuvres.heroTitle, lang)?.toLowerCase()}
          </h1>
        </div>
      </div>

      <style jsx global>{`
        @font-face {
          font-family: "FuturaLightCustom";
          src: url("/fonts/Futura-Light.woff2") format("woff2");
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
    </section>
  );
}