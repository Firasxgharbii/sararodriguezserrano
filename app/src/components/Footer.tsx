"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Instagram, Mail, Image } from "lucide-react";

const futuraLight = {
  fontFamily:
    '"Futura PT", Futura, "Avenir Next", "Helvetica Neue", Arial, sans-serif',
  fontWeight: 300,
};

export default function Footer() {
  useRevealOnScroll();

  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  return (
    <footer className="w-full border-t border-black/10 bg-[#d6d6d6] text-black">
      <div className="w-full px-6 py-20 sm:px-10 lg:px-20">
        
        {/* 🔥 CREDIT */}
        <div
          className="mb-16 text-[10px] uppercase tracking-[0.34em] text-black/40"
          style={futuraLight}
        >
          Made by OffClassic Studio
        </div>

        <div className="grid items-start gap-14 lg:grid-cols-12">
          
          {/* NAVIGATION */}
          <div className="lg:col-span-3">
            <nav
              className="space-y-4 text-[11px] uppercase tracking-[0.28em] text-black/70"
              style={futuraLight}
            >
              <Link href="/#works" className="block transition hover:text-black">
                ŒUVRES
              </Link>

              <Link href="/#about" className="block transition hover:text-black">
                À PROPOS
              </Link>

              <Link href="/#contact" className="block transition hover:text-black">
                CONTACT
              </Link>
            </nav>
          </div>

          {/* SOCIAL */}
          <div className="space-y-4 text-sm text-black/65 lg:col-span-3">
            <a
              href="https://www.instagram.com/sara_rodriguez_serrano/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 transition hover:text-black"
            >
              <Instagram size={17} strokeWidth={1.5} />
              Instagram
            </a>

            <a
              href="mailto:sararodriguezserrano.art@gmail.com"
              className="flex items-center gap-3 transition hover:text-black"
            >
              <Mail size={17} strokeWidth={1.5} />
              Email
            </a>

            <a
              href="#"
              className="flex items-center gap-3 transition hover:text-black"
            >
              <Image size={17} strokeWidth={1.5} />
              Facebook
            </a>
          </div>

          {/* BIG NAME */}
          <div className="ml-auto flex flex-col items-end text-right lg:col-span-6">
            <div
              data-reveal
              className="reveal text-[46px] uppercase leading-[1.05] text-[#8a8a8a] sm:text-[62px] lg:text-[86px]"
              style={{
                ...futuraLight,
                letterSpacing: "0.08em",
              }}
            >
              SARA RODRIGUEZ SERRANO
            </div>

            <div
              className="mt-5 text-xs uppercase tracking-[0.2em] text-black/45"
              style={futuraLight}
            >
              © {year} Sara Rodriguez Serrano
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-16">
          <Link
            href="/#contact"
            className="inline-flex h-11 items-center justify-center border border-black/60 px-12 text-[11px] uppercase tracking-[0.25em] text-black/80 transition hover:bg-black hover:text-white"
            style={futuraLight}
          >
            LET’S CONNECT
          </Link>
        </div>
      </div>

      {/* ANIMATION */}
      <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }

        .is-revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </footer>
  );
}

/* ANIMATION */
function useRevealOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}