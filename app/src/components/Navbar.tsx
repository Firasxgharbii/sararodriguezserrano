"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe, Instagram, Mail, Menu, X } from "lucide-react";

type Lang = "fr" | "en" | "es";

const INSTAGRAM_URL = "https://www.instagram.com/sara_rodriguez_serrano/";
const EMAIL_URL = "mailto:sararodriguezserrano.art@gmail.com";
const LANG_STORAGE_KEY = "site_lang";

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
    const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;
    if (savedLang === "fr" || savedLang === "en" || savedLang === "es") {
      setLang(savedLang);
    }
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

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200/70 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          {/* MOBILE */}
          <div className="flex items-center justify-between py-4 md:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white"
            >
              <Menu size={19} />
            </button>

            <Link
              href="/"
              className="text-center text-[1.35rem] uppercase leading-none text-[#7f7f7f]"
              style={{
                fontFamily:
                  '"Futura PT", Futura, "Avenir Next", "Helvetica Neue", sans-serif',
                fontWeight: 300,
                letterSpacing: "0.16em",
              }}
            >
              Sara Rodriguez Serrano
            </Link>

            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangOpen((prev) => !prev)}
                className="flex h-11 items-center gap-1 rounded-full border border-neutral-200 bg-white px-3 text-sm"
              >
                {t.current}
                <ChevronDown size={15} />
              </button>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:block">
            <div className="relative py-5">
              <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-3">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  <Instagram size={15} />
                </a>

                <a href={EMAIL_URL}>
                  <Mail size={15} />
                </a>

                <Link href="/login">
                  <Globe size={15} />
                </Link>

                <div className="relative ml-2" ref={langRef}>
                  <button
                    type="button"
                    onClick={() => setLangOpen((prev) => !prev)}
                    className="flex items-center gap-1 rounded-full border border-neutral-200 px-3 py-1.5 text-xs tracking-[0.12em]"
                  >
                    {t.current}
                    <ChevronDown size={14} />
                  </button>

                  <div
                    className={`absolute right-0 top-10 z-50 w-44 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl transition-all duration-300 ${
                      langOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-2 opacity-0"
                    }`}
                  >
                    <button
                      onClick={() => handleChangeLang("fr")}
                      className="w-full px-4 py-3 text-left text-sm hover:bg-neutral-50"
                    >
                      {t.french}
                    </button>
                    <button
                      onClick={() => handleChangeLang("en")}
                      className="w-full px-4 py-3 text-left text-sm hover:bg-neutral-50"
                    >
                      {t.english}
                    </button>
                    <button
                      onClick={() => handleChangeLang("es")}
                      className="w-full px-4 py-3 text-left text-sm hover:bg-neutral-50"
                    >
                      {t.spanish}
                    </button>
                  </div>
                </div>
              </div>

              <Link
                href="/"
                className="block text-center text-[2.55rem] uppercase leading-none text-[#7f7f7f]"
                style={{
                  fontFamily:
                    '"Futura PT", Futura, "Avenir Next", "Helvetica Neue", sans-serif',
                  fontWeight: 300,
                  letterSpacing: "0.23em",
                }}
              >
                Sara Rodriguez Serrano
              </Link>
            </div>

            <nav className="flex justify-center gap-9 pb-5 text-[12px] uppercase tracking-[0.28em] text-neutral-700">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="transition hover:text-black"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* MENU MOBILE */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/25"
          onClick={() => setMobileOpen(false)}
        />

        <div className="absolute left-0 top-0 h-full w-[86%] max-w-[360px] bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-5">
            <p
              className="text-[1.25rem] uppercase text-[#7f7f7f]"
              style={{
                fontFamily:
                  '"Futura PT", Futura, "Avenir Next", "Helvetica Neue", sans-serif',
                fontWeight: 300,
                letterSpacing: "0.16em",
              }}
            >
              Sara Rodriguez Serrano
            </p>

            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex flex-col px-5 py-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-neutral-100 py-4 text-sm uppercase tracking-[0.22em]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}