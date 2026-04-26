"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Facebook, Instagram, Mail } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/sara_rodriguez_serrano/";
const FACEBOOK_URL = "https://www.facebook.com/saru.rodriguez.9";
const EMAIL_URL = "mailto:sararodriguezserrano.art@gmail.com";

const futuraLight = {
  fontFamily:
    '"FuturaLightCustom", "Futura W02 Light", "Futura PT", Futura, "Avenir Next", "Helvetica Neue", Arial, sans-serif',
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
      <div className="w-full px-6 py-16 sm:px-10 sm:py-20 lg:px-20">
        <div
          className="mb-12 text-center text-[10px] uppercase tracking-[0.34em] text-black/40 sm:mb-16 lg:text-left"
          style={futuraLight}
        >
          Made by OffClassic Studio
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="text-center lg:col-span-3 lg:text-left">
            <nav
              className="space-y-4 text-[11px] uppercase tracking-[0.28em] text-black/70"
              style={futuraLight}
            >
              <Link href="/oeuvres" className="block transition hover:text-black">
                ŒUVRES
              </Link>

              <Link href="/about" className="block transition hover:text-black">
                À PROPOS
              </Link>

              <Link href="/contact" className="block transition hover:text-black">
                CONTACT
              </Link>
            </nav>
          </div>

          <div className="flex flex-col items-center gap-4 text-sm text-black/65 lg:col-span-3 lg:items-start">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 transition hover:text-black"
              style={futuraLight}
            >
              <Instagram size={17} strokeWidth={1.5} />
              Instagram
            </a>

            <a
              href={EMAIL_URL}
              className="flex items-center gap-3 transition hover:text-black"
              style={futuraLight}
            >
              <Mail size={17} strokeWidth={1.5} />
              sararodriguezserrano.art@gmail.com
            </a>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 transition hover:text-black"
              style={futuraLight}
            >
              <Facebook size={17} strokeWidth={1.5} />
              Facebook
            </a>
          </div>

          <div className="flex flex-col items-center text-center lg:col-span-6 lg:items-end lg:text-right">
            <div
              data-reveal
              className="reveal max-w-[760px] text-[34px] uppercase leading-[1.08] text-[#8a8a8a] sm:text-[54px] lg:text-[82px]"
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

        <div className="mt-14 flex justify-center lg:justify-start">
       <Link
  href="/contact"
  className="inline-flex h-11 items-center justify-center border border-neutral-300 bg-white px-10 text-[11px] uppercase tracking-[0.25em] text-neutral-700 transition duration-300 hover:border-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 sm:px-12"
  style={futuraLight}
>
  LET’S CONNECT
</Link>
        </div>
      </div>

      <style jsx global>{`
        @font-face {
          font-family: "FuturaLightCustom";
          src: url("/fonts/Futura-Light.woff2") format("woff2");
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }
      `}</style>

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