"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe, Instagram, Mail, Menu, X } from "lucide-react";

type Lang = "fr" | "en" | "es";

const INSTAGRAM_URL = "https://www.instagram.com/sara_rodriguez_serrano/";
const EMAIL_URL = "mailto:sararodriguezserrano.art@gmail.com";

const translations = {
  fr: {
    current: "FR",
    home: "ACCUEIL",
    works: "ŒUVRES",
    about: "À PROPOS",
    contact: "CONTACT",
    language: "Langue",
    french: "Français",
    english: "Anglais",
    spanish: "Espagnol",
  },
  en: {
    current: "EN",
    home: "HOME",
    works: "WORKS",
    about: "ABOUT",
    contact: "CONTACT",
    language: "Language",
    french: "French",
    english: "English",
    spanish: "Spanish",
  },
  es: {
    current: "ES",
    home: "INICIO",
    works: "OBRAS",
    about: "ACERCA DE",
    contact: "CONTACTO",
    language: "Idioma",
    french: "Francés",
    english: "Inglés",
    spanish: "Español",
  },
};

const LANG_STORAGE_KEY = "site_lang";

export default function Navbar() {
  const [lang, setLang] = useState<Lang>("fr");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);

  const t = translations[lang];

  const navItems = [
    { href: "/", label: t.home },
    { href: "/oeuvres", label: t.works },
    { href: "/about", label: t.about },
    { href: "/contact", label: t.contact },
  ];

  const handleChangeLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem(LANG_STORAGE_KEY, newLang);
    setLangOpen(false);
    setMobileOpen(false);

    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("focus"));
  };

  useEffect(() => {
    const syncLang = () => {
      const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;
      if (savedLang === "fr" || savedLang === "en" || savedLang === "es") {
        setLang(savedLang);
      } else {
        setLang("fr");
      }
    };

    syncLang();

    window.addEventListener("storage", syncLang);
    window.addEventListener("focus", syncLang);

    return () => {
      window.removeEventListener("storage", syncLang);
      window.removeEventListener("focus", syncLang);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between py-4 md:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 transition duration-300 hover:bg-neutral-50 active:scale-95"
            >
              <Menu size={19} />
            </button>

            <div className="px-3 text-center">
              <h1
                className="text-[1.9rem] leading-[1.05] text-[#808080]"
                style={{
                  fontFamily:
                    '"Futura PT", "Futura", "Avenir Next", "Helvetica Neue", sans-serif',
                  fontWeight: 300,
                  letterSpacing: "0.08em",
                }}
              >
                Sara Rodriguez Serrano
              </h1>
            </div>

            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangOpen((prev) => !prev)}
                className="flex h-11 items-center gap-1 rounded-full border border-neutral-200 bg-white px-3 text-sm text-neutral-900 transition duration-300 hover:bg-neutral-50 active:scale-95"
              >
                {t.current}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    langOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute right-0 top-12 z-50 w-40 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl transition-all duration-300 ${
                  langOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleChangeLang("fr")}
                  className="w-full px-4 py-3 text-left text-sm transition hover:bg-neutral-50"
                >
                  {t.french}
                </button>

                <button
                  type="button"
                  onClick={() => handleChangeLang("en")}
                  className="w-full px-4 py-3 text-left text-sm transition hover:bg-neutral-50"
                >
                  {t.english}
                </button>

                <button
                  type="button"
                  onClick={() => handleChangeLang("es")}
                  className="w-full px-4 py-3 text-left text-sm transition hover:bg-neutral-50"
                >
                  {t.spanish}
                </button>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative py-6">
              <div className="absolute right-0 top-6 flex items-center gap-3">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 transition duration-300 hover:-translate-y-[2px] hover:text-neutral-900"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>

                <a
                  href={EMAIL_URL}
                  className="text-neutral-600 transition duration-300 hover:-translate-y-[2px] hover:text-neutral-900"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>

                <Link
                  href="/login"
                  className="text-neutral-600 transition duration-300 hover:-translate-y-[2px] hover:text-neutral-900"
                  aria-label="Login"
                >
                  <Globe size={18} />
                </Link>

                <div className="relative ml-2" ref={langRef}>
                  <button
                    type="button"
                    onClick={() => setLangOpen((prev) => !prev)}
                    className="flex items-center gap-1 rounded-full border border-neutral-200 px-4 py-2 text-sm tracking-[0.12em] text-neutral-900 transition duration-300 hover:bg-neutral-50"
                  >
                    {t.current}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        langOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl transition-all duration-300 ${
                      langOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-2 opacity-0"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleChangeLang("fr")}
                      className="w-full px-4 py-3 text-left text-sm transition hover:bg-neutral-50"
                    >
                      {t.french}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleChangeLang("en")}
                      className="w-full px-4 py-3 text-left text-sm transition hover:bg-neutral-50"
                    >
                      {t.english}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleChangeLang("es")}
                      className="w-full px-4 py-3 text-left text-sm transition hover:bg-neutral-50"
                    >
                      {t.spanish}
                    </button>
                  </div>
                </div>
              </div>

              <h1
                className="text-center text-5xl text-[#808080]"
                style={{
                  fontFamily:
                    '"Futura PT", "Futura", "Avenir Next", "Helvetica Neue", sans-serif',
                  fontWeight: 300,
                  letterSpacing: "0.2em",
                }}
              >
                Sara Rodriguez Serrano
              </h1>
            </div>

            <nav className="flex justify-center gap-10 pb-6 text-[13px] tracking-[0.28em] text-neutral-800">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative pb-1 transition duration-300 hover:text-black"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-neutral-900 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${
          mobileOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={`absolute left-0 top-0 h-full w-[88%] max-w-[380px] bg-white shadow-2xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-5">
              <div className="pr-4">
                <h2
                  className="text-[1.8rem] leading-[1.05] text-[#808080]"
                  style={{
                    fontFamily:
                      '"Futura PT", "Futura", "Avenir Next", "Helvetica Neue", sans-serif',
                    fontWeight: 300,
                    letterSpacing: "0.08em",
                  }}
                >
                  Sara Rodriguez Serrano
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-900 transition hover:bg-neutral-50 active:scale-95"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="group rounded-2xl px-3 py-4 text-[0.95rem] tracking-[0.22em] text-neutral-900 transition duration-300 hover:bg-neutral-50"
                    style={{
                      animation: mobileOpen
                        ? `fadeSlide .35s ease forwards ${index * 0.08}s`
                        : "none",
                      opacity: 0,
                    }}
                  >
                    <span className="relative inline-block">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-neutral-900 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="mt-8 border-t border-neutral-200 pt-6">
                <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-neutral-500">
                  {t.language}
                </p>

                <div className="flex flex-wrap gap-2">
                  {(["fr", "en", "es"] as Lang[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleChangeLang(item)}
                      className={`rounded-full border px-4 py-2.5 text-sm transition duration-300 ${
                        lang === item
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50"
                      }`}
                    >
                      {item.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div className="mt-7 flex items-center gap-5 text-neutral-600">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition duration-300 hover:-translate-y-[2px] hover:text-neutral-900"
                    aria-label="Instagram"
                  >
                    <Instagram size={18} />
                  </a>

                  <a
                    href={EMAIL_URL}
                    className="transition duration-300 hover:-translate-y-[2px] hover:text-neutral-900"
                    aria-label="Email"
                  >
                    <Mail size={18} />
                  </a>

                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="transition duration-300 hover:-translate-y-[2px] hover:text-neutral-900"
                    aria-label="Login"
                  >
                    <Globe size={18} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-200 px-5 py-4">
              <p
                className="text-xs text-[#808080]"
                style={{
                  fontFamily:
                    '"Futura PT", "Futura", "Avenir Next", "Helvetica Neue", sans-serif',
                  fontWeight: 300,
                  letterSpacing: "0.2em",
                }}
              >
                Sara Rodriguez Serrano
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}