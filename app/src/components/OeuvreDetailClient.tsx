"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  defaultSiteContent,
  type SiteContent,
  type Lang,
  LANG_STORAGE_KEY,
} from "../../lib/siteContent";
import { t } from "../../lib/i18n";

/* ---------------- UTIL ---------------- */

function getSafeSlug(value?: string) {
  return (value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isValidImageUrl(url?: string) {
  if (!url) return false;
  const clean = url.trim();
  if (!clean || clean === "undefined" || clean === "null") return false;
  return clean.startsWith("http") || clean.startsWith("/");
}

function getOptimizedImageUrl(url: string) {
  if (!url) return "";
  const clean = url.trim();

  if (clean.includes("res.cloudinary.com") && clean.includes("/upload/")) {
    return clean.replace("/upload/", "/upload/f_auto,q_auto,w_1200/");
  }

  return clean;
}

/* ---------------- COMPONENT ---------------- */

export default function OeuvreDetailClient({ slug }: { slug: string }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [ready, setReady] = useState(false);
  const [lang, setLang] = useState<Lang>("fr");

  /* ---------- LOAD DATA ---------- */

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/site-content", {
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          setContent(data);
        }
      } catch (e) {
        console.error("Erreur API:", e);
      }

      const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;

      setLang(
        savedLang === "fr" || savedLang === "en" || savedLang === "es"
          ? savedLang
          : "fr"
      );

      setReady(true);
    };

    load();
  }, []);

  /* ---------- FIND OEUVRE ---------- */

  const oeuvre = useMemo(() => {
    const current = getSafeSlug(slug);

    return content.oeuvres.items.find((item: any) => {
      return (
        getSafeSlug(item.slug) === current ||
        getSafeSlug(item.title?.fr) === current ||
        getSafeSlug(item.title?.en) === current ||
        getSafeSlug(item.title?.es) === current
      );
    });
  }, [content, slug]);

  if (!ready) return null;
  if (!oeuvre) notFound();

  /* ---------- DATA ---------- */

  const title = t(oeuvre.title, lang);

  const images =
    oeuvre.galleryImages?.filter((img: any) =>
      isValidImageUrl(img?.src || img)
    ) || [];

  /* ---------- UI ---------- */

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#ecebea] px-6 pt-16 pb-24">
        <div className="mx-auto max-w-[1100px]">

          {/* TITLE */}
          <h1 className="mb-12 text-[48px] tracking-[0.12em] text-[#8b7771]">
            {title}
          </h1>

          {/* BACK */}
          <Link
            href="/oeuvres"
            className="mb-10 inline-block text-[12px] uppercase tracking-[0.2em] text-[#8b7771]"
          >
            ← Retour aux œuvres
          </Link>

          {/* IMAGES */}
          <div className="grid gap-16 sm:grid-cols-2">
            {(images.length > 0 ? images : [oeuvre]).map(
              (img: any, i: number) => {
                const src = img?.src || oeuvre.image;

                if (!isValidImageUrl(src)) return null;

                return (
                  <div key={i}>
                    <Image
                      src={getOptimizedImageUrl(src)}
                      alt={title}
                      width={1000}
                      height={1200}
                      className="w-full object-cover"
                      unoptimized
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}