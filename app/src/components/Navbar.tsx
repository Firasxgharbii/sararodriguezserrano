"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe, Instagram, Mail, Menu, X } from "lucide-react";

type Lang = "fr" | "en" | "es";

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

export default function Navbar() {
  const [lang, setLang] = useState<Lang>("fr");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);

  const t = translations[lang];

  const navItems = [
    { href: "/", label: t.home },
    { href: "/#works", label: t.works },
    { href: "/about", label: t.about },
    { href: "/contact", label: t.contact },
  ];

  const handleChangeLang = (newLang: Lang) => {
    setLang(newLang);
    setLangOpen(false);
  };

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
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          {/* MOBILE HEADER */}
          <div className="flex items-center justify-between py-4 md:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 transition duration-300 hover:bg-neutral-50 active:scale-95"
            >
              <Menu size={19} />
            </button>

            <div className="px-3 text-center">
              <h1 className="font-serif text-[1.9rem] leading-[1.05] tracking-[0.02em] text-neutral-900">
                Sara Rodriguez Serrano
              </h1>
            </div>

            <div className="relative" ref={langRef}>
              <button
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
                  onClick={() => handleChangeLang("fr")}
                  className="w-full px-4 py-3 text-left text-sm transition hover:bg-neutral-50"
                >
                  {t.french}
                </button>
                <button
                  onClick={() => handleChangeLang("en")}
                  className="w-full px-4 py-3 text-left text-sm transition hover:bg-neutral-50"
                >
                  {t.english}
                </button>
                <button
                  onClick={() => handleChangeLang("es")}
                  className="w-full px-4 py-3 text-left text-sm transition hover:bg-neutral-50"
                >
                  {t.spanish}
                </button>
              </div>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:block">
            <div className="relative py-6">
              <div className="absolute right-0 top-6 flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-600 transition duration-300 hover:-translate-y-[2px] hover:text-neutral-900"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="mailto:sararodriguezserrano.art@gmail.com"
                  className="text-neutral-600 transition duration-300 hover:-translate-y-[2px] hover:text-neutral-900"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
                <a
                  href="/contact"
                  className="text-neutral-600 transition duration-300 hover:-translate-y-[2px] hover:text-neutral-900"
                  aria-label="Contact"
                >
                  <Globe size={18} />
                </a>

                <div className="relative ml-2" ref={langRef}>
                  <button
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
                        : "pointer-events-none -translate-y2 opacity-0"
                    }`}
                  >
                    <button
                      onClick={() => handleChangeLang("fr")}
                      className="w-full px-4 py-3 text-left text-sm transition hover:bg-neutral-50"
                    >
                      {t.french}
                    </button>
                    <button
                      onClick={() => handleChangeLang("en")}
                      className="w-full px-4 py-3 text-left text-sm transition hover:bg-neutral-50"
                    >
                      {t.english}
                    </button>
                    <button
                      onClick={() => handleChangeLang("es")}
                      className="w-full px-4 py-3 text-left text-sm transition hover:bg-neutral-50"
                    >
                      {t.spanish}
                    </button>
                  </div>
                </div>
              </div>

              <h1 className="text-center font-serif text-5xl tracking-[0.03em] text-neutral-900">
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

      {/* MOBILE FULLSCREEN MENU */}
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
                <h2 className="font-serif text-[1.8rem] leading-[1.05] text-neutral-900">
                  Sara Rodriguez Serrano
                </h2>
              </div>

              <button
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
                  <button
                    onClick={() => handleChangeLang("fr")}
                    className={`rounded-full border px-4 py-2.5 text-sm transition duration-300 ${
                      lang === "fr"
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50"
                    }`}
                  >
                    FR
                  </button>
                  <button
                    onClick={() => handleChangeLang("en")}
                    className={`rounded-full border px-4 py-2.5 text-sm transition duration-300 ${
                      lang === "en"
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => handleChangeLang("es")}
                    className={`rounded-full border px-4 py-2.5 text-sm transition duration-300 ${
                      lang === "es"
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50"
                    }`}
                  >
                    ES
                  </button>
                </div>

                <div className="mt-7 flex items-center gap-5 text-neutral-600">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="transition duration-300 hover:-translate-y-[2px] hover:text-neutral-900"
                    aria-label="Instagram"
                  >
                    <Instagram size={18} />
                  </a>
                  <a
                    href="mailto:sararodriguezserrano.art@gmail.com"
                    className="transition duration-300 hover:-translate-y-[2px] hover:text-neutral-900"
                    aria-label="Email"
                  >
                    <Mail size={18} />
                  </a>
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="transition duration-300 hover:-translate-y-[2px] hover:text-neutral-900"
                    aria-label="Contact"
                  >
                    <Globe size={18} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-200 px-5 py-4">
              <p className="text-xs tracking-[0.2em] text-neutral-400">
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