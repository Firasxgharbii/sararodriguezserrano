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
    <footer className="min-h-screen w-full border-t border-black/10 bg-[#d6d6d6] text-black">
      <div className="w-full px-6 py-24 sm:px-10 lg:px-20">
        {/* CREDIT */}
        <div className="mb-16 text-xs uppercase tracking-[0.28em] text-black/50">
          Made by OffClassic Studio
        </div>

        {/* GRID */}
        <div className="grid items-start gap-16 lg:grid-cols-12">
          {/* NAVIGATION */}
          <div className="lg:col-span-3">
            <nav className="space-y-4 text-xs font-semibold uppercase tracking-[0.25em]">
              <Link
                href="/#gallery"
                className="block transition hover:opacity-70"
              >
                ŒUVRES
              </Link>

              <Link
                href="/#about"
                className="block transition hover:opacity-70"
              >
                À PROPOS
              </Link>

              <Link
                href="/#contact"
                className="block transition hover:opacity-70"
              >
                CONTACT
              </Link>
            </nav>
          </div>

          {/* SOCIAL LINKS WITH ICONS */}
          <div className="space-y-4 text-sm text-black/70 lg:col-span-3">
            <a
              href="https://www.instagram.com/sara_rodriguez_serrano/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 transition hover:text-black"
            >
              <Instagram size={18} strokeWidth={1.5} />
              Instagram
            </a>

            <a
              href="mailto:sararodriguezserrano.art@gmail.com"
              className="flex items-center gap-3 transition hover:text-black"
            >
              <Mail size={18} strokeWidth={1.5} />
              Email
            </a>

            <a
              href="#"
              className="flex items-center gap-3 transition hover:text-black"
            >
              <Image size={18} strokeWidth={1.5} />
              Facebook
            </a>
          </div>

          {/* BIG NAME */}
          <div className="ml-auto flex flex-col items-end text-right lg:col-span-6">
            <div
              data-reveal
              className="reveal font-serif text-[64px] leading-[0.9] sm:text-[90px] lg:text-[130px]"
            >
              Sara
              <br />
              Rodriguez
              <br />
              Serrano
            </div>

            <div className="mt-4 text-xs text-black/50">
              © {year} Sara Rodriguez Serrano
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-20">
          <Link
            href="/#contact"
            className="inline-flex h-11 items-center justify-center border border-black px-12 text-xs font-semibold uppercase tracking-[0.25em] transition hover:bg-black hover:text-white"
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