"use client";

import Navbar from "../src/components/Navbar";
import Hero from "../src/components/Hero";
import Footer from "../src/components/Footer";
import { ArrowRight, Download, BookOpen, Palette, Newspaper } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <Navbar />

      {/* HERO déjà créé */}
      <Hero />

      {/* ABOUT CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        {/* Intro */}
        <div className="mb-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-[fadeUp_.7s_ease]">
            <p className="mb-4 text-xs uppercase tracking-[0.38em] text-neutral-400">
              À propos
            </p>

            <h2 className="mb-6 font-serif text-4xl leading-tight text-neutral-900 sm:text-5xl">
              Une pratique guidée par
              <br />
              la mémoire, la couleur
              <br />
              et l’émotion
            </h2>

            <div className="mb-8 h-[1px] w-20 bg-neutral-300"></div>

            <p className="max-w-2xl text-[17px] leading-8 text-neutral-600">
              Mon travail explore la relation entre la mémoire, le paysage
              intérieur et le silence. À travers des détails subtils, des
              couches de couleur et des formes organiques, je cherche à révéler
              les connexions invisibles entre les sens et les émotions.
              Inspirées par des lieux chargés d’une énergie singulière, mes
              peintures célèbrent l’intensité discrète des petites choses.
            </p>
          </div>

          <div className="animate-[fadeUp_.9s_ease] rounded-[28px] border border-neutral-200 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <p className="mb-2 text-xs uppercase tracking-[0.28em] text-neutral-400">
              Biographie
            </p>

            <h3 className="mb-4 font-serif text-3xl text-neutral-900">
              Sara Rodriguez Serrano
            </h3>

            <p className="text-[15px] leading-7 text-neutral-600">
              Artiste visuelle basée à Montréal, sa pratique se concentre
              principalement sur la peinture contemporaine. Son travail explore
              la relation entre la matière, la couleur et la perception,
              créant des espaces où se rencontrent émotion et expérience
              sensorielle.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-neutral-600">
              Guidée par un esprit naturaliste et en grande partie autodidacte,
              elle aborde la peinture comme une manière d’observer et de se
              connecter au monde qui l’entoure. La nature constitue sa
              principale source d’inspiration.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#parcours"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-900 px-5 py-3 text-sm uppercase tracking-[0.22em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
              >
                Parcours artistique
                <ArrowRight size={16} />
              </a>

              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-5 py-3 text-sm uppercase tracking-[0.22em] text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
              >
                Télécharger CV
                <Download size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Démarche + Publications */}
        <div className="mb-20 grid gap-8 lg:grid-cols-2">
          <div className="animate-[fadeUp_1s_ease] rounded-[28px] border border-neutral-200 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-neutral-800">
                <Palette size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-neutral-400">
                  Démarche artistique
                </p>
                <h3 className="font-serif text-2xl text-neutral-900">
                  Vision et pratique
                </h3>
              </div>
            </div>

            <p className="text-[15px] leading-8 text-neutral-600">
              Je travaille principalement à la peinture à l’huile, attirée par
              sa texture et la profondeur expressive qu’elle permet. Je crée
              ainsi des espaces oniriques qui invitent à la contemplation et à
              l’évasion. Ma pratique cherche à instaurer un dialogue sensible
              entre paysage intérieur et monde naturel.
            </p>
          </div>

          <div className="animate-[fadeUp_1.1s_ease] rounded-[28px] border border-neutral-200 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-neutral-800">
                <Newspaper size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-neutral-400">
                  Publications
                </p>
                <h3 className="font-serif text-2xl text-neutral-900">
                  Sélection récente
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-[15px] leading-7 text-neutral-600">
              <p>
                <span className="font-medium text-neutral-900">2025</span> — Livres et projets
                éditoriaux - Art et Femme, édition 2.
              </p>
              <p>
                <span className="font-medium text-neutral-900">2025</span> — Articles de Magazine
                - Artist Close up magazine #36.
              </p>
              <p>
                <span className="font-medium text-neutral-900">2025</span> — Interviews, Arts to
                Hearts Project.
              </p>
            </div>
          </div>
        </div>

        {/* Collections */}
        <div className="mb-20 animate-[fadeUp_1.2s_ease] rounded-[28px] border border-neutral-200 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-neutral-800">
              <BookOpen size={18} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-neutral-400">
                Collections
              </p>
              <h3 className="font-serif text-2xl text-neutral-900">
                Présence dans des collections privées
              </h3>
            </div>
          </div>

          <ul className="grid gap-4 text-[15px] leading-7 text-neutral-600 sm:grid-cols-2">
            <li className="rounded-2xl bg-neutral-50 px-5 py-4">
              Certaines peintures font partie de collections privées en Espagne.
            </li>
            <li className="rounded-2xl bg-neutral-50 px-5 py-4">
              Certaines œuvres sont présentes dans des collections privées à Montréal, Canada.
            </li>
            <li className="rounded-2xl bg-neutral-50 px-5 py-4 sm:col-span-2">
              Les œuvres de l’artiste sont également représentées dans des collections privées en Europe et au Canada.
            </li>
          </ul>
        </div>

        {/* Parcours artistique */}
        <div
          id="parcours"
          className="animate-[fadeUp_1.3s_ease] rounded-[32px] border border-neutral-200 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
        >
          <p className="mb-2 text-xs uppercase tracking-[0.28em] text-neutral-400">
            Parcours artistique
          </p>

          <h3 className="mb-8 font-serif text-4xl text-neutral-900">
            Expositions, formation et distinctions
          </h3>

          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-neutral-500">
                Expositions
              </h4>
              <div className="space-y-3 text-[15px] leading-7 text-neutral-600">
                <p><span className="font-medium text-neutral-900">2026</span> — The Inner Forest, Montréal, Canada</p>
                <p><span className="font-medium text-neutral-900">2014</span> — Portraits d’animaux, Madrid, Espagne</p>
                <p><span className="font-medium text-neutral-900">2013</span> — Portraits de femmes, Madrid, Espagne</p>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-neutral-500">
                Formation
              </h4>
              <div className="space-y-3 text-[15px] leading-7 text-neutral-600">
                <p><span className="font-medium text-neutral-900">2024</span> — Programme de peinture numérique, Procreate</p>
                <p><span className="font-medium text-neutral-900">2023</span> — Peinture murale intérieure</p>
                <p><span className="font-medium text-neutral-900">2022</span> — Formation en broderie, transfert et aquarelle</p>
                <p><span className="font-medium text-neutral-900">2015</span> — Carnet de croquis</p>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-neutral-500">
                Distinctions
              </h4>
              <div className="space-y-3 text-[15px] leading-7 text-neutral-600">
                <p><span className="font-medium text-neutral-900">2012</span> — Concours peinture rapide, Madrid</p>
                <p><span className="font-medium text-neutral-900">2011</span> — Concours peinture rapide, Alameda de Osuna</p>
                <p><span className="font-medium text-neutral-900">2002–2005</span> — Architecture technique, Université San Pablo Ceu, Madrid</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}