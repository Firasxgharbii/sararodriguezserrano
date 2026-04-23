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
          alt={t(oeuvres.heroTitle, lang) || "Atelier de peinture"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,20,20,0.28),rgba(20,20,20,0.42))]" />

      <div className="relative mx-auto flex min-h-[420px] max-w-6xl items-center justify-center px-6 py-20 text-center md:min-h-[520px] md:px-10 md:py-28 lg:py-32">
        <div className="max-w-4xl">
          <p className="mb-5 text-[11px] uppercase tracking-[0.42em] text-white/75 md:text-[12px]">
            {t(oeuvres.heroBadge, lang)}
          </p>

          <h1 className="mx-auto max-w-5xl text-[28px] font-light tracking-[0.14em] text-white md:text-[42px] lg:text-[54px]">
            {t(oeuvres.heroTitle, lang)}
          </h1>

          <div className="mx-auto mt-8 h-px w-20 bg-white/40" />

          <Link
            href="#gallery"
            className="mt-10 inline-flex min-h-[54px] items-center justify-center border border-white/55 bg-white/10 px-8 py-4 text-[12px] uppercase tracking-[0.24em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#3f342f]"
          >
            {t(oeuvres.heroButtonText, lang)}
          </Link>
        </div>
      </div>
    </section>
  );
}