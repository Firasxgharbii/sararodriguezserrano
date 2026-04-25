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
import { getMergedSiteContent } from "../../lib/getSiteContent";
import { t } from "../../lib/i18n";

const futuraLight = {
  fontFamily:
    '"Futura PT", Futura, "Avenir Next", "Helvetica Neue", Arial, sans-serif',
  fontWeight: 300,
};

export default function OeuvresIntroSection() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const loadData = () => {
      setContent(getMergedSiteContent());

      const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;
      if (savedLang === "fr" || savedLang === "en" || savedLang === "es") {
        setLang(savedLang);
      } else {
        setLang("fr");
      }
    };

    loadData();

    window.addEventListener("focus", loadData);
    window.addEventListener("storage", loadData);

    return () => {
      window.removeEventListener("focus", loadData);
      window.removeEventListener("storage", loadData);
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
          <p
            className="mb-5 text-[10px] uppercase tracking-[0.46em] text-white/85 md:text-[11px]"
            style={futuraLight}
          >
            {t(oeuvres.heroBadge, lang)}
          </p>

          <h1
            className="mx-auto max-w-4xl text-[28px] uppercase leading-[1.25] tracking-[0.18em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.22)] md:text-[42px] lg:text-[52px]"
            style={futuraLight}
          >
            {t(oeuvres.heroTitle, lang)}
          </h1>

          <div className="mx-auto mt-8 h-px w-24 bg-white/45" />

          <Link
            href="#gallery"
            className="mt-10 inline-flex min-h-[48px] items-center justify-center border border-white/60 bg-white/10 px-8 py-3 text-[10px] uppercase tracking-[0.28em] text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-neutral-900"
            style={futuraLight}
          >
            {t(oeuvres.heroButtonText, lang)}
          </Link>
        </div>
      </div>
    </section>
  );
}