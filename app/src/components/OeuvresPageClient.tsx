"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  defaultSiteContent,
  SiteContent,
  STORAGE_KEY,
  Lang,
  LANG_STORAGE_KEY,
} from "../../lib/siteContent";

import { t } from "../../lib/i18n";

type ParsedSiteContent = Partial<SiteContent> & {
  home?: Partial<SiteContent["home"]>;
  about?: Partial<SiteContent["about"]>;
  contact?: Partial<SiteContent["contact"]>;
  oeuvres?: Partial<SiteContent["oeuvres"]> & {
    items?: any[];
  };
};

export default function OeuvresPageClient() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [ready, setReady] = useState(false);
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const loadData = () => {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (!stored) {
        setContent(defaultSiteContent);
      } else {
        try {
          const parsed: ParsedSiteContent = JSON.parse(stored);

          setContent({
            ...defaultSiteContent,
            ...parsed,

            home: {
              ...defaultSiteContent.home,
              ...(parsed.home ?? {}),
              heroImageStyle: {
                ...defaultSiteContent.home.heroImageStyle,
                ...(parsed.home?.heroImageStyle ?? {}),
              },
            },

            about: {
              ...defaultSiteContent.about,
              ...(parsed.about ?? {}),
              profileImage: {
                ...defaultSiteContent.about.profileImage,
                ...(parsed.about?.profileImage ?? {}),
              },
              publications:
                parsed.about?.publications ??
                defaultSiteContent.about.publications,
              collections:
                parsed.about?.collections ??
                defaultSiteContent.about.collections,
              exhibitions:
                parsed.about?.exhibitions ??
                defaultSiteContent.about.exhibitions,
              formations:
                parsed.about?.formations ??
                defaultSiteContent.about.formations,
              distinctions:
                parsed.about?.distinctions ??
                defaultSiteContent.about.distinctions,
            },

            contact: {
              ...defaultSiteContent.contact,
              ...(parsed.contact ?? {}),
              contactImage: {
                ...defaultSiteContent.contact.contactImage,
                ...(parsed.contact?.contactImage ?? {}),
              },
            },

            oeuvres: {
              ...defaultSiteContent.oeuvres,
              ...(parsed.oeuvres ?? {}),
              items: (
                parsed.oeuvres?.items ??
                defaultSiteContent.oeuvres.items
              ).map((item: any, index: number) => ({
                ...(defaultSiteContent.oeuvres.items[index] ?? {}),
                ...item,
                galleryImages:
                  item?.galleryImages ??
                  defaultSiteContent.oeuvres.items[index]?.galleryImages ??
                  [],
              })),
            },
          });
        } catch {
          setContent(defaultSiteContent);
        }
      }

      const savedLang = localStorage.getItem(
        LANG_STORAGE_KEY
      ) as Lang | null;

      if (savedLang === "fr" || savedLang === "en" || savedLang === "es") {
        setLang(savedLang);
      } else {
        setLang("fr");
      }

      setReady(true);
    };

    loadData();

    window.addEventListener("focus", loadData);
    window.addEventListener("storage", loadData);

    return () => {
      window.removeEventListener("focus", loadData);
      window.removeEventListener("storage", loadData);
    };
  }, []);

  if (!ready) return null;

  const oeuvres = content.oeuvres;

  const visibleItems = oeuvres.items.filter(
    (item) => item.title || item.image
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f7f5f1] text-[#1a1a1a]">
        
        {/* HERO */}
        <section className="relative w-full overflow-hidden bg-[#f7f4f3]">
          <div className="absolute inset-0">
            <Image
              src={oeuvres.heroImage || "/5312.jpg"}
              alt="Œuvres"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,20,20,0.28),rgba(20,20,20,0.42))]" />

          <div className="relative mx-auto flex min-h-[420px] max-w-6xl items-center justify-center px-6 py-20 text-center">
            <div className="max-w-4xl">
              <p className="mb-5 text-[11px] uppercase tracking-[0.42em] text-white/75">
                {t(oeuvres.heroBadge, lang)}
              </p>

              <h1 className="text-[28px] font-light tracking-[0.14em] text-white md:text-[42px] lg:text-[54px]">
                {t(oeuvres.heroTitle, lang)}
              </h1>

              <div className="mx-auto mt-8 h-px w-20 bg-white/40" />

              <Link
                href="#gallery"
                className="mt-10 inline-flex min-h-[54px] items-center justify-center border border-white/55 bg-white/10 px-8 py-4 text-[12px] uppercase tracking-[0.24em] text-white backdrop-blur-sm transition hover:bg-white hover:text-[#3f342f]"
              >
                {t(oeuvres.heroButtonText, lang)}
              </Link>
            </div>
          </div>
        </section>

        {/* GRID */}
        <section id="gallery" className="mx-auto max-w-[1550px] px-8 pt-24 pb-20">
          <div className="grid grid-cols-1 gap-24 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item) => (
              <Link key={item.id} href={`/oeuvres/${item.slug}`}>
                <div className="group">
                  <div className="relative aspect-square overflow-hidden bg-[#e8e4df]">
                    <Image
                      src={item.image || "/5312.jpg"}
                      alt="Œuvre"
                      fill
                      className="object-cover transition group-hover:scale-[1.03]"
                    />
                  </div>

                  <h2 className="pt-5 text-[17px] tracking-[0.20em] text-[#8a7d76] group-hover:text-[#5d524b]">
                    {t(item.title, lang)}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* QUOTE */}
        <section className="mt-20 w-full bg-[#f7f4f3]">
          <div className="grid min-h-[720px] lg:grid-cols-2">
            <div className="relative min-h-[420px]">
              <Image
                src={oeuvres.quoteImage || "/IMAGE Grande.jpg"}
                alt="Citation"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-center px-8 py-16 lg:px-20">
              <div className="max-w-[430px]">
                <div className="mb-6 text-[90px] text-[#ead9d8]">“</div>

                <p className="text-[22px] leading-[1.85] tracking-[0.16em] text-[#9b8b88]">
                  {t(oeuvres.quoteText, lang)}
                </p>

                <p className="mt-10 text-[18px] tracking-[0.14em] text-[#a79592]">
                  {t(oeuvres.quoteAuthor, lang)}
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}