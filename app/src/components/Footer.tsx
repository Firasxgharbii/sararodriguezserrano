"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Instagram, Mail, Image } from "lucide-react";

export default function Footer() {
  useRevealOnScroll();

  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="w-full px-6 sm:px-10 lg:px-20 py-24">

        {/* CREDIT */}
        <div className="mb-16 text-xs tracking-[0.28em] uppercase text-white/50">
          Made by OffClassic Studio
        </div>

        {/* GRID */}
        <div className="grid gap-16 lg:grid-cols-12 items-start">

          {/* NAVIGATION */}
          <div className="lg:col-span-3">
            <nav className="space-y-4 text-xs font-semibold tracking-[0.25em] uppercase">
              
              <Link
                href="/#gallery"
                className="block hover:opacity-70 transition"
              >
                ŒUVRES
              </Link>

              <Link
                href="/#about"
                className="block hover:opacity-70 transition"
              >
                À PROPOS
              </Link>

              <Link
                href="/#contact"
                className="block hover:opacity-70 transition"
              >
                CONTACT
              </Link>

            </nav>
          </div>

          {/* SOCIAL LINKS WITH ICONS */}
          <div className="lg:col-span-3 text-sm text-white/70 space-y-4">

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <Instagram size={18} strokeWidth={1.5} />
              Instagram
            </a>

            <a
              href="mailto:contact@sararodriguezserrano.com"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <Mail size={18} strokeWidth={1.5} />
              Email
            </a>

            <a
              href="#"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <Image size={18} strokeWidth={1.5} />
              Exhibitions
            </a>

          </div>

          {/* BIG NAME */}
          <div className="lg:col-span-6 ml-auto text-right flex flex-col items-end">

            <div
              data-reveal
              className="reveal font-serif text-[64px] sm:text-[90px] lg:text-[130px] leading-[0.9]"
            >
              Sara
              <br />
              Rodriguez
              <br />
              Serrano
            </div>

            <div className="mt-4 text-xs text-white/50">
              © {year} Sara Rodriguez Serrano
            </div>

          </div>

        </div>

        {/* BUTTON */}
        <div className="mt-20">

          <Link
            href="/#contact"
            className="inline-flex items-center justify-center h-11 px-12 border border-white text-xs font-semibold tracking-[0.25em] uppercase hover:bg-white hover:text-black transition"
          >
            LET’S CONNECT
          </Link>

        </div>

      </div>

      {/* ANIMATION */}
      <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(25px);
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

/* ===========================
   REVEAL ANIMATION
=========================== */

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
