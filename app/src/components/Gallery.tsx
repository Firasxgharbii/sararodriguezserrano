"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  defaultSiteContent,
  LANG_STORAGE_KEY,
  type Lang,
} from "../../lib/siteContent";
import { getSiteContent } from "../../lib/getSiteContent";

const futuraLight = {
  fontFamily:
    '"FuturaLightCustom", "Futura W02 Light", "Futura PT", Futura, "Avenir Next", "Helvetica Neue", Arial, sans-serif',
  fontWeight: 300,
  textTransform: "uppercase" as const,
};

function getSavedLang(): Lang {
  if (typeof window === "undefined") return "fr";

  const savedLang = localStorage.getItem(LANG_STORAGE_KEY);

  if (savedLang === "fr" || savedLang === "en" || savedLang === "es") {
    return savedLang;
  }

  return "fr";
}

export default function Gallery() {
  const [content, setContent] = useState(defaultSiteContent);
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const loadContent = () => {
      setContent(getSiteContent());
      setLang(getSavedLang());
    };

    loadContent();

    window.addEventListener("focus", loadContent);
    window.addEventListener("storage", loadContent);

    return () => {
      window.removeEventListener("focus", loadContent);
      window.removeEventListener("storage", loadContent);
    };
  }, []);

  const gallery = content.home.gallery;
  const works = gallery.works ?? [];

  return (
    <section id="works" className="bg-[#f8f7f4] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-24 text-center">
          <p
            className="mb-4 text-[10px] tracking-[0.42em] text-neutral-400"
            style={futuraLight}
          >
            {gallery.badge[lang]}
          </p>

          <h2
            className="mb-6 text-[44px] leading-none text-[#8a8a8a] sm:text-[58px]"
            style={{
              ...futuraLight,
              letterSpacing: "0.12em",
            }}
          >
            {gallery.title[lang]}
          </h2>

          <div className="mx-auto mb-6 h-[1px] w-24 bg-neutral-300" />
        </div>

        <div className="mb-28">
          <article className="group">
            <div className="overflow-hidden bg-white shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
              <div className="relative h-[72vh] min-h-[420px] w-full overflow-hidden">
                <Image
                  src={gallery.featuredImage}
                  alt={gallery.featuredTitle[lang]}
                  fill
                  priority
                  className="object-cover transition duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>

            <div className="mt-10 max-w-3xl">
              <p
                className="mb-3 text-[10px] tracking-[0.38em] text-neutral-400"
                style={futuraLight}
              >
                {gallery.featuredBadge[lang]}
              </p>

              <h3
                className="text-[36px] leading-tight text-[#8a8a8a] sm:text-[52px]"
                style={{
                  ...futuraLight,
                  letterSpacing: "0.08em",
                }}
              >
                {gallery.featuredTitle[lang]}
              </h3>

              <p className="mt-5 max-w-2xl text-[17px] leading-8 text-neutral-600">
                {gallery.featuredText[lang]}
              </p>
            </div>
          </article>
        </div>

        <div className="grid gap-14 md:grid-cols-3">
          {works.map((work, index) => (
            <article key={index} className="group">
              <div className="overflow-hidden bg-white shadow-[0_14px_36px_rgba(0,0,0,0.05)]">
                <div className="relative h-[360px] w-full overflow-hidden">
                  <Image
                    src={work.src}
                    alt={work.title[lang]}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </div>

              <div className="mt-6">
                <p
                  className="mb-2 text-[10px] tracking-[0.34em] text-neutral-400"
                  style={futuraLight}
                >
                  {work.category[lang]}
                </p>

                <h3
                  className="text-[27px] leading-snug text-[#8a8a8a]"
                  style={{
                    ...futuraLight,
                    letterSpacing: "0.06em",
                  }}
                >
                  {work.title[lang]}
                </h3>
              </div>
            </article>
          ))}
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