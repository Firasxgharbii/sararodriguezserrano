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
} from "../lib/siteContent";
import { getSiteContent } from "../lib/getSiteContent";
import { t } from "../lib/i18n";

const cvFiles: Record<Lang, string> = {
  fr: "/cv/CV French Sara Rodriguez.pdf",
  en: "/cv/CV English Sara Rodriguez.pdf",
  es: "/cv/CV Spanish Sara Rodriguez.pdf",
};

function getProfileWrapperSize(size: "small" | "medium" | "large") {
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

export default function AboutPage() {
  const [lang, setLang] = useState<Lang>("fr");
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);

  useEffect(() => {
    const syncLang = () => {
      const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;
      setLang(savedLang === "fr" || savedLang === "en" || savedLang === "es" ? savedLang : "fr");
    };

    const loadContent = () => {
      setContent(getSiteContent());
    };

    syncLang();
    loadContent();

    window.addEventListener("focus", syncLang);
    window.addEventListener("focus", loadContent);
    window.addEventListener("storage", syncLang);
    window.addEventListener("storage", loadContent);

    return () => {
      window.removeEventListener("focus", syncLang);
      window.removeEventListener("focus", loadContent);
      window.removeEventListener("storage", syncLang);
      window.removeEventListener("storage", loadContent);
    };
  }, []);

  const about = {
    ...defaultSiteContent.about,
    ...content.about,
    profileImage: {
      ...defaultSiteContent.about.profileImage,
      ...(content.about?.profileImage ?? {}),
    },
    publications: content.about?.publications ?? defaultSiteContent.about.publications,
    collections: content.about?.collections ?? defaultSiteContent.about.collections,
    exhibitions: content.about?.exhibitions ?? defaultSiteContent.about.exhibitions,
    formations: content.about?.formations ?? defaultSiteContent.about.formations,
    distinctions: content.about?.distinctions ?? defaultSiteContent.about.distinctions,
  };

  const handleDownloadCV = () => {
    const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;
    const activeLang: Lang =
      savedLang === "fr" || savedLang === "en" || savedLang === "es" ? savedLang : "fr";

    const rawPath = cvFiles[activeLang];
    const link = document.createElement("a");
    link.href = encodeURI(rawPath);
    link.download = rawPath.split("/").pop() || "cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const imageSrc = about.profileImage?.src || about.image || "/sara1.jpg";

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#f6f2ed]">
        <div className="absolute inset-0">
          <Image
            src={about.image || "/sara1.jpg"}
            alt={t(about.title, lang)}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20"
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(248,247,244,0.72),rgba(248,247,244,0.94))]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
          <div className="max-w-4xl">
            <p className="mb-4 text-xs uppercase tracking-[0.38em] text-neutral-400">
              {t(about.badge, lang)}
            </p>

            <h1 className="text-4xl font-light leading-tight tracking-[0.04em] text-neutral-800 sm:text-5xl lg:text-6xl">
              {t(about.title, lang)}
            </h1>

            <div className="mt-8 h-[1px] w-20 bg-neutral-300" />

            <p className="mt-8 max-w-2xl text-[17px] leading-8 text-neutral-600">
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
                className={`relative overflow-hidden border border-neutral-200 bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,0.08)] ${getProfileWrapperSize(
                  about.profileImage.size
                )}`}
              >
                <div className="h-full w-full overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={t(about.title, lang)}
                    width={900}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.05]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border border-neutral-200 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <p className="mb-2 text-xs uppercase tracking-[0.28em] text-neutral-400">
              {t(about.bioTitle, lang)}
            </p>

            <p className="text-[15px] leading-7 text-neutral-600">
              {t(about.bioText1, lang)}
            </p>

            <p className="mt-4 text-[15px] leading-7 text-neutral-600">
              {t(about.bioText2, lang)}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#parcours"
                className="inline-flex items-center gap-2 border border-neutral-900 px-5 py-3 text-sm uppercase tracking-[0.22em] text-neutral-900 transition duration-300 hover:bg-neutral-900 hover:text-white"
              >
                {t(about.parcoursButtonLabel, lang)}
                <ArrowRight size={16} />
              </a>

              <button
                type="button"
                onClick={handleDownloadCV}
                className="inline-flex items-center gap-2 border border-neutral-200 px-5 py-3 text-sm uppercase tracking-[0.22em] text-neutral-700 transition duration-300 hover:border-neutral-900 hover:text-neutral-900"
              >
                {t(about.cvButtonLabel, lang)}
                <Download size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-20 grid gap-8 lg:grid-cols-2">
          <div className="border border-neutral-200 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center bg-neutral-100 text-neutral-800">
                <Palette size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-neutral-400">
                  {t(about.visionBadge, lang)}
                </p>
                <h3 className="text-2xl font-light text-neutral-900">
                  {t(about.visionTitle, lang)}
                </h3>
              </div>
            </div>

            <p className="text-[15px] leading-8 text-neutral-600">
              {t(about.visionText, lang)}
            </p>
          </div>

          <div className="border border-neutral-200 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center bg-neutral-100 text-neutral-800">
                <Newspaper size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-neutral-400">
                  {t(about.publicationsBadge, lang)}
                </p>
                <h3 className="text-2xl font-light text-neutral-900">
                  {t(about.publicationsTitle, lang)}
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-[15px] leading-7 text-neutral-600">
              {about.publications.map((item, index) => (
                <p key={index}>
                  <span className="font-medium text-neutral-900">
                    {item.year}
                  </span>{" "}
                  — {t(item.text, lang)}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20 border border-neutral-200 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center bg-neutral-100 text-neutral-800">
              <BookOpen size={18} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-neutral-400">
                {t(about.collectionsBadge, lang)}
              </p>
              <h3 className="text-2xl font-light text-neutral-900">
                {t(about.collectionsTitle, lang)}
              </h3>
            </div>
          </div>

          <ul className="grid gap-4 text-[15px] leading-7 text-neutral-600 sm:grid-cols-2">
            {about.collections.map((item, index) => (
              <li
                key={index}
                className={`bg-neutral-50 px-5 py-4 ${
                  index === 2 ? "sm:col-span-2" : ""
                }`}
              >
                {t(item.text, lang)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-20">
          <PortfolioSection />
        </div>

        <div
          id="parcours"
          className="border border-neutral-200 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
        >
          <p className="mb-2 text-xs uppercase tracking-[0.28em] text-neutral-400">
            {t(about.parcoursBadge, lang)}
          </p>

          <h3 className="mb-8 text-4xl font-light text-neutral-900 sm:text-5xl">
            {t(about.parcoursTitle, lang)}
          </h3>

          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-neutral-500">
                {t(about.exhibitionsTitle, lang)}
              </h4>
              <div className="space-y-3 text-[15px] leading-7 text-neutral-600">
                {about.exhibitions.map((item, index) => (
                  <p key={index}>
                    <span className="font-medium text-neutral-900">
                      {item.year}
                    </span>{" "}
                    — {t(item.text, lang)}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-neutral-500">
                {t(about.formationTitle, lang)}
              </h4>
              <div className="space-y-3 text-[15px] leading-7 text-neutral-600">
                {about.formations.map((item, index) => (
                  <p key={index}>
                    <span className="font-medium text-neutral-900">
                      {item.year}
                    </span>{" "}
                    — {t(item.text, lang)}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-neutral-500">
                {t(about.distinctionsTitle, lang)}
              </h4>
              <div className="space-y-3 text-[15px] leading-7 text-neutral-600">
                {about.distinctions.map((item, index) => (
                  <p key={index}>
                    <span className="font-medium text-neutral-900">
                      {item.year}
                    </span>{" "}
                    — {t(item.text, lang)}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}