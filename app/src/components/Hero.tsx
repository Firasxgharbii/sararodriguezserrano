"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  defaultSiteContent,
  type SiteContent,
  type Lang,
  LANG_STORAGE_KEY,
} from "../../lib/siteContent";
import { getSiteContent } from "../../lib/getSiteContent";
import { t } from "../../lib/i18n";

function getImageHeight(size: "small" | "medium" | "large") {
  switch (size) {
    case "small":
      return "h-[260px] sm:h-[340px] md:h-[420px] lg:h-[500px]";
    case "medium":
      return "h-[320px] sm:h-[440px] md:h-[520px] lg:h-[640px]";
    case "large":
    default:
      return "h-[320px] sm:h-[440px] md:h-[520px] lg:h-[640px]";
  }
}

function getImageRadius(shape: "square" | "rounded" | "circle") {
  switch (shape) {
    case "square":
      return "rounded-[0px]";
    case "circle":
      return "rounded-full";
    case "rounded":
    default:
      return "rounded-[24px] sm:rounded-[28px] lg:rounded-[30px]";
  }
}

function getImageObjectPosition(position: "left" | "center" | "right") {
  switch (position) {
    case "left":
      return "object-left";
    case "right":
      return "object-right";
    case "center":
    default:
      return "object-center";
  }
}

export default function Hero() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const loadContent = () => {
      setContent(getSiteContent());

      const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;
      if (savedLang === "fr" || savedLang === "en" || savedLang === "es") {
        setLang(savedLang);
      } else {
        setLang("fr");
      }
    };

    loadContent();

    const handleFocus = () => loadContent();
    const handleStorage = () => loadContent();

    window.addEventListener("focus", handleFocus);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const hero = content.home;

  const imageStyle = hero.heroImageStyle ?? {
    src: hero.image || "/sara1.jpg",
    size: "medium" as const,
    shape: "rounded" as const,
    position: "center" as const,
  };

  const imageSrc = imageStyle.src || hero.image || "/sara1.jpg";

  return (
    <section className="relative w-full overflow-hidden bg-[#f8f7f4]">
      {/* subtle background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-80px] top-[-80px] h-64 w-64 rounded-full bg-[#e9e4da] opacity-60 blur-3xl" />
        <div className="absolute bottom-[-100px] right-[-60px] h-72 w-72 rounded-full bg-[#ece7de] opacity-70 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-20">
          {/* IMAGE */}
          <div className="relative order-1">
            <div
              className={`relative overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.10)] ${getImageRadius(
                imageStyle.shape
              )}`}
            >
              <div
                className={`relative w-full ${getImageHeight(imageStyle.size)}`}
              >
                <Image
                  src={imageSrc}
                  alt={t(hero.title, lang) || "Sara Rodriguez Serrano"}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`object-cover transition duration-700 hover:scale-[1.03] ${getImageObjectPosition(
                    imageStyle.position
                  )}`}
                />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-4 bottom-4 h-16 bg-gradient-to-t from-black/10 to-transparent sm:inset-x-6 sm:bottom-6" />
          </div>

          {/* TEXT */}
          <div className="order-2 flex flex-col justify-center">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.38em] text-neutral-500 sm:mb-5 sm:text-xs">
              {t(hero.badge, lang)}
            </p>

            <h1 className="max-w-3xl font-serif text-[34px] leading-[1.02] text-neutral-900 sm:text-[46px] md:text-[54px] lg:text-[64px]">
              {t(hero.title, lang)}
            </h1>

            <div className="mt-5 h-[1px] w-16 bg-neutral-300 sm:mt-6 sm:w-20" />

            <p className="mt-6 max-w-2xl text-[17px] leading-8 text-neutral-700 sm:mt-8 sm:text-[18px] sm:leading-9 md:text-[19px]">
              {t(hero.text1, lang)} {t(hero.text2, lang)}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
              <a
                href="#works"
                className="group inline-flex min-h-[56px] items-center justify-center rounded-full bg-[#9f9f9f] px-8 py-4 text-center text-sm font-medium uppercase tracking-[0.22em] text-white transition duration-300 hover:bg-[#8d8d8d]"
              >
                {t(hero.primaryButton, lang)}
                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="#about"
                className="group inline-flex min-h-[56px] items-center justify-center rounded-full bg-[#9f9f9f] px-8 py-4 text-center text-sm font-medium uppercase tracking-[0.22em] text-white transition duration-300 hover:bg-[#8d8d8d]"
              >
                {t(hero.secondaryButton, lang)}
                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}