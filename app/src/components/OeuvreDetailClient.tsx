"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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

export default function OeuvreDetailClient({ slug }: { slug: string }) {
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

  const oeuvre = useMemo(() => {
    return content.oeuvres.items.find((item) => item.slug === slug);
  }, [content, slug]);

  if (!ready) return null;
  if (!oeuvre) notFound();

  const galleryImages = (oeuvre.galleryImages ?? []).filter(
    (img) => typeof img === "string" && img.trim() !== ""
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#ecebea] text-[#7f6e67]">
        <section className="mx-auto max-w-[1280px] px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-20">
          
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_0.8fr] md:items-start">
            
            <div>
              <h1 className="max-w-4xl text-[28px] font-light leading-[1.2] tracking-[0.12em] text-[#8e7a72] md:text-[52px]">
                {t(oeuvre.galleryTitle, lang) || t(oeuvre.title, lang)}
              </h1>
            </div>

            <div className="md:pt-3">
              <p className="text-[16px] leading-8 text-[#a28f87]">
                {t(oeuvre.gallerySubtitle, lang) ||
                  t(oeuvre.description, lang)}
              </p>

              <div className="mt-8">
                <Link
                  href="/oeuvres"
                  className="inline-flex items-center text-[12px] uppercase tracking-[0.22em] text-[#9b847b] transition-opacity duration-300 hover:opacity-70"
                >
                  ← Retour aux œuvres
                </Link>
              </div>
            </div>
          </div>

          {galleryImages.length > 0 && (
            <div className="mt-24 columns-1 gap-20 sm:columns-2 lg:gap-24">
              {galleryImages.map((image, index) => (
                <div
                  key={`${oeuvre.slug}-${index}`}
                  className="mb-20 break-inside-avoid overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`${t(oeuvre.title, lang)} ${index + 1}`}
                    width={1400}
                    height={1800}
                    className="h-auto w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 flex justify-end">
            <Link
              href="/oeuvres"
              className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.22em] text-[#b09086] transition-opacity duration-300 hover:opacity-70"
            >
              Retour
              <span className="text-lg">›</span>
            </Link>
          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}