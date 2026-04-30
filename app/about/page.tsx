"use client";

import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import PortfolioSection from "../src/components/PortfolioSection";
import Image from "next/image";
import {
  ArrowRight,
  Download,
  BookOpen,
  Palette,
  Newspaper,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  defaultSiteContent,
  type SiteContent,
  type Lang,
  LANG_STORAGE_KEY,
  type LocalizedText,
} from "../lib/siteContent";
import { t } from "../lib/i18n";

const cvFiles: Record<Lang, string> = {
  fr: "/cv/CV French Sara Rodriguez.pdf",
  en: "/cv/CV English Sara Rodriguez.pdf",
  es: "/cv/CV Spanish Sara Rodriguez.pdf",
};

const futuraLight = {
  fontFamily:
    '"FuturaLightCustom", "Futura W02 Light", "Futura PT", Futura, "Avenir Next", "Helvetica Neue", Arial, sans-serif',
  fontWeight: 300,
};

const softShadow = "shadow-[0_18px_45px_rgba(120,120,120,0.10)]";

type TimelineItem = {
  year: string;
  text: LocalizedText;
};

type CollectionItem = {
  text: LocalizedText;
};

function getProfileWrapperSize(size?: "small" | "medium" | "large") {
  switch (size) {
    case "small":
      return "h-[280px] w-[280px] md:h-[340px] md:w-[340px] lg:h-[380px] lg:w-[380px]";
    case "medium":
      return "h-[320px] w-[320px] md:h-[400px] md:w-[400px] lg:h-[460px] lg:w-[460px]";
    case "large":
    default:
      return "h-[360px] w-[360px] md:h-[460px] md:w-[460px] lg:h-[520px] lg:w-[520px]";
  }
}

function getOptimizedImageUrl(url: string) {
  if (!url) return "";

  const clean = url.trim();

  if (clean.includes("res.cloudinary.com") && clean.includes("/upload/")) {
    return clean.replace("/upload/", "/upload/f_auto,q_auto,w_1400,c_limit/");
  }

  return clean;
}

function mergeSiteContent(parsed: Partial<SiteContent> | null): SiteContent {
  if (!parsed) return defaultSiteContent;

  return {
    ...defaultSiteContent,
    ...parsed,

    about: {
      ...defaultSiteContent.about,
      ...(parsed.about ?? {}),
      profileImage: {
        ...defaultSiteContent.about.profileImage,
        ...(parsed.about?.profileImage ?? {}),
      },
      publications:
        parsed.about?.publications ?? defaultSiteContent.about.publications,
      collections:
        parsed.about?.collections ?? defaultSiteContent.about.collections,
      exhibitions:
        parsed.about?.exhibitions ?? defaultSiteContent.about.exhibitions,
      formations:
        parsed.about?.formations ?? defaultSiteContent.about.formations,
      distinctions:
        parsed.about?.distinctions ?? defaultSiteContent.about.distinctions,
    },
  };
}

function CleanLineList({
  title,
  items,
  lang,
}: {
  title?: string;
  items: TimelineItem[];
  lang: Lang;
}) {
  return (
    <div>
      {title && (
        <h4
          className="mb-4 text-[13px] uppercase tracking-[0.24em] text-[#aaa1a0]"
          style={futuraLight}
        >
          {title}
        </h4>
      )}

      <div className="space-y-3 text-[15px] font-light leading-7 text-[#6f6866]">
        {items.map((item, index) => {
          const text = t(item.text, lang);
          if (!item.year && !text) return null;

          return (
            <p key={`${title ?? "item"}-${index}`}>
              {item.year && (
                <span className="font-light text-[#8a7d76]">
                  {item.year}
                </span>
              )}
              {item.year && text ? " — " : ""}
              <span>{text}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
}

function CleanCollectionList({
  items,
  lang,
}: {
  items: CollectionItem[];
  lang: Lang;
}) {
  return (
    <div className="space-y-3 text-[15px] font-light leading-7 text-[#6f6866]">
      {items.map((item, index) => {
        const text = t(item.text, lang);
        if (!text) return null;

        return (
          <p key={`collection-${index}`}>
            <span className="mr-2 text-[#aaa1a0]">•</span>
            {text}
          </p>
        );
      })}
    </div>
  );
}

export default function AboutPage() {
  const [lang, setLang] = useState<Lang>("fr");
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
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
        console.error("Erreur chargement About depuis Aiven:", error);
        setContent(defaultSiteContent);
      }

      const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;

      setLang(
        savedLang === "fr" || savedLang === "en" || savedLang === "es"
          ? savedLang
          : "fr"
      );

      setReady(true);
    };

    loadContent();

    window.addEventListener("focus", loadContent);
    window.addEventListener("storage", loadContent);

    return () => {
      window.removeEventListener("focus", loadContent);
      window.removeEventListener("storage", loadContent);
    };
  }, []);

  if (!ready) return null;

  const about = {
    ...defaultSiteContent.about,
    ...content.about,
    profileImage: {
      ...defaultSiteContent.about.profileImage,
      ...(content.about?.profileImage ?? {}),
    },
    publications:
      content.about?.publications ?? defaultSiteContent.about.publications,
    collections:
      content.about?.collections ?? defaultSiteContent.about.collections,
    exhibitions:
      content.about?.exhibitions ?? defaultSiteContent.about.exhibitions,
    formations:
      content.about?.formations ?? defaultSiteContent.about.formations,
    distinctions:
      content.about?.distinctions ?? defaultSiteContent.about.distinctions,
  };

  const handleDownloadCV = () => {
    const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;

    const activeLang: Lang =
      savedLang === "fr" || savedLang === "en" || savedLang === "es"
        ? savedLang
        : "fr";

    const rawPath = cvFiles[activeLang];

    const link = document.createElement("a");
    link.href = encodeURI(rawPath);
    link.download = rawPath.split("/").pop() || "cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const imageSrc =
    about.profileImage?.src ||
    about.image ||
    defaultSiteContent.about.image ||
    "/sara1.jpg";

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#f6f2ed]">
        <div className="absolute inset-0">
          <Image
            src={getOptimizedImageUrl(about.image || "/sara1.jpg")}
            alt={t(about.title, lang)}
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover opacity-20"
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(248,247,244,0.76),rgba(248,247,244,0.96))]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
          <div className="max-w-4xl">
            <p
              className="mb-4 text-xs uppercase tracking-[0.38em] text-neutral-400"
              style={futuraLight}
            >
              {t(about.badge, lang)}
            </p>

            <h1
              className="mb-6 text-[34px] leading-tight text-[#8a8a8a]"
              style={futuraLight}
            >
              {t(about.title, lang)}
            </h1>

            <div className="mt-8 h-[1px] w-20 bg-neutral-300" />

            <p className="mt-8 max-w-2xl text-[17px] font-light leading-8 text-neutral-600">
              {t(about.introText, lang)}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-20 grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="flex items-center justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute inset-0 scale-110 bg-[#e9dfd7] opacity-70 blur-3xl" />

              <div
                className={`relative overflow-hidden border border-neutral-200 bg-white p-3 ${softShadow} ${getProfileWrapperSize(
                  about.profileImage?.size
                )}`}
              >
                <div className="h-full w-full overflow-hidden">
                  <Image
                    src={getOptimizedImageUrl(imageSrc)}
                    alt={t(about.title, lang)}
                    width={900}
                    height={900}
                    unoptimized
                    className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.05]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={`border border-neutral-200 bg-white p-6 ${softShadow}`}>
            <p
              className="mb-2 text-xs uppercase tracking-[0.28em] text-neutral-400"
              style={futuraLight}
            >
              {t(about.bioTitle, lang)}
            </p>

            <p className="text-[15px] font-light leading-7 text-neutral-600">
              {t(about.bioText1, lang)}
            </p>

            <p className="mt-4 text-[15px] font-light leading-7 text-neutral-600">
              {t(about.bioText2, lang)}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#parcours"
                className="inline-flex items-center gap-2 border border-neutral-200 px-5 py-3 text-sm uppercase tracking-[0.22em] text-neutral-700 transition duration-300 hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
                style={futuraLight}
              >
                {t(about.parcoursButtonLabel, lang)}
                <ArrowRight size={16} />
              </a>

              <button
                type="button"
                onClick={handleDownloadCV}
                className="inline-flex items-center gap-2 border border-neutral-200 px-5 py-3 text-sm uppercase tracking-[0.22em] text-neutral-700 transition duration-300 hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
                style={futuraLight}
              >
                {t(about.cvButtonLabel, lang)}
                <Download size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-20 grid gap-8 lg:grid-cols-2">
          <div className={`border border-neutral-200 bg-white p-7 ${softShadow}`}>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center bg-neutral-100 text-neutral-700">
                <Palette size={18} />
              </div>

              <div>
                <p
                  className="text-xs uppercase tracking-[0.26em] text-neutral-400"
                  style={futuraLight}
                >
                  {t(about.visionBadge, lang)}
                </p>

                <h3 className="text-2xl text-[#8a8a8a]" style={futuraLight}>
                  {t(about.visionTitle, lang)}
                </h3>
              </div>
            </div>

            <p className="text-[15px] font-light leading-8 text-neutral-600">
              {t(about.visionText, lang)}
            </p>
          </div>

          <div className={`border border-neutral-200 bg-white p-7 ${softShadow}`}>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center bg-neutral-100 text-neutral-700">
                <Newspaper size={18} />
              </div>

              <div>
                <p
                  className="text-xs uppercase tracking-[0.26em] text-neutral-400"
                  style={futuraLight}
                >
                  {t(about.publicationsBadge, lang)}
                </p>

                <h3 className="text-2xl text-[#8a8a8a]" style={futuraLight}>
                  {t(about.publicationsTitle, lang)}
                </h3>
              </div>
            </div>

            <CleanLineList items={about.publications} lang={lang} />
          </div>
        </div>

        <div
          className={`mb-20 border border-neutral-200 bg-white p-7 ${softShadow}`}
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center bg-neutral-100 text-neutral-700">
              <BookOpen size={18} />
            </div>

            <div>
              <p
                className="text-xs uppercase tracking-[0.26em] text-neutral-400"
                style={futuraLight}
              >
                {t(about.collectionsBadge, lang)}
              </p>

              <h3 className="text-2xl text-[#8a8a8a]" style={futuraLight}>
                {t(about.collectionsTitle, lang)}
              </h3>
            </div>
          </div>

          <CleanCollectionList items={about.collections} lang={lang} />
        </div>

        <div className="mb-20">
          <PortfolioSection />
        </div>

        <div
          id="parcours"
          className={`border border-neutral-200 bg-white p-7 ${softShadow}`}
        >
          <p
            className="mb-2 text-xs uppercase tracking-[0.28em] text-neutral-400"
            style={futuraLight}
          >
            CV ({lang.toUpperCase()})
          </p>

          <h3
            className="mb-8 text-[34px] leading-tight text-[#8a8a8a]"
            style={futuraLight}
          >
            {t(about.parcoursTitle, lang)}
          </h3>

          <div className="grid gap-10 lg:grid-cols-3">
            <CleanLineList
              title={t(about.exhibitionsTitle, lang)}
              items={about.exhibitions}
              lang={lang}
            />

            <CleanLineList
              title={t(about.formationTitle, lang)}
              items={about.formations}
              lang={lang}
            />

            <CleanLineList
              title={t(about.distinctionsTitle, lang)}
              items={about.distinctions}
              lang={lang}
            />
          </div>
        </div>
      </section>

      <style jsx global>{`
        @font-face {
          font-family: "FuturaLightCustom";
          src: url("/fonts/Futura-Light.woff2") format("woff2");
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }
      `}</style>

      <Footer />
    </main>
  );
}