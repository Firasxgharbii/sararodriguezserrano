"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { defaultSiteContent, type SiteContent } from "../../lib/siteContent";

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M19 12H5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M11 6L5 12L11 18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function mergeSiteContent(parsed: Partial<SiteContent> | null): SiteContent {
  if (!parsed) return defaultSiteContent;

  return {
    ...defaultSiteContent,
    ...parsed,

    home: {
      ...defaultSiteContent.home,
      ...(parsed.home ?? {}),
      heroImageStyle: {
        ...defaultSiteContent.home.heroImageStyle,
        ...(parsed.home?.heroImageStyle ?? {}),
      },
      gallery: {
        ...defaultSiteContent.home.gallery,
        ...(parsed.home?.gallery ?? {}),
        works: (
          parsed.home?.gallery?.works ?? defaultSiteContent.home.gallery.works
        ).map((item: any, index: number) => ({
          ...(defaultSiteContent.home.gallery.works[index] ?? {}),
          ...item,
        })),
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
        parsed.about?.publications ?? defaultSiteContent.about.publications,
      collections:
        parsed.about?.collections ?? defaultSiteContent.about.collections,
      exhibitions:
        parsed.about?.exhibitions ?? defaultSiteContent.about.exhibitions,
      formations: parsed.about?.formations ?? defaultSiteContent.about.formations,
      distinctions:
        parsed.about?.distinctions ?? defaultSiteContent.about.distinctions,
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
        parsed.oeuvres?.items ?? defaultSiteContent.oeuvres.items
      ).map((item: any, index: number) => ({
        ...(defaultSiteContent.oeuvres.items[index] ?? {}),
        ...item,
        galleryImages:
          item?.galleryImages ??
          defaultSiteContent.oeuvres.items[index]?.galleryImages ??
          [],
      })),
    },

    portfolio: (parsed.portfolio ?? defaultSiteContent.portfolio).map(
      (item: any, index: number) => ({
        ...(defaultSiteContent.portfolio[index] ?? {}),
        ...item,
      })
    ),
  };
}

export default function PortfolioSection() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const res = await fetch("/api/site-content", {
          cache: "no-store",
        });

        if (!res.ok) {
          setContent(defaultSiteContent);
          return;
        }

        const data = await res.json();
        setContent(mergeSiteContent(data));
      } catch (error) {
        console.error("Erreur chargement portfolio:", error);
        setContent(defaultSiteContent);
      }
    };

    loadContent();

    window.addEventListener("focus", loadContent);

    return () => {
      window.removeEventListener("focus", loadContent);
    };
  }, []);

  const portfolioItems =
    content.portfolio?.length > 0
      ? content.portfolio.filter((item) => item.image)
      : defaultSiteContent.portfolio;

  const total = portfolioItems.length;

  const activeItem = useMemo(
    () => portfolioItems[activeIndex],
    [portfolioItems, activeIndex]
  );

  useEffect(() => {
    if (activeIndex > total - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, total]);

  const goPrev = () => {
    if (total <= 0) return;
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const goNext = () => {
    if (total <= 0) return;
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isPaused || total <= 1) return;

    const timer = setInterval(() => {
      goNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, total]);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) goNext();
    if (distance < -50) goPrev();

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!activeItem) return null;

  return (
    <section id="portfolio" className="w-full">
      <div className="overflow-hidden rounded-none bg-white shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
        <div
          className="group relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[16/9]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <img
            key={activeItem.image}
            src={activeItem.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.015]"
          />

          <div className="absolute inset-0 bg-black/10" />

          {total > 1 && (
            <div className="absolute left-4 top-4 z-20 flex items-center gap-3 sm:left-6 sm:top-6 lg:left-8 lg:top-8">
              <button
                type="button"
                onClick={goPrev}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-sm transition duration-300 hover:bg-black/35 active:scale-95"
                aria-label="Précédent"
              >
                <ArrowLeftIcon />
              </button>

              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-sm transition duration-300 hover:bg-black/35 active:scale-95"
                aria-label="Suivant"
              >
                <ArrowRightIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}