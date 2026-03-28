"use client";

import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import { Mail, Instagram, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="bg-[#faf8f4] min-h-screen">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* LEFT SIDE */}
          <div className="animate-[fadeUp_.7s_ease]">

            <p className="text-xs tracking-[0.4em] uppercase text-neutral-400 mb-4">
              Contact
            </p>

            <h1 className="font-serif text-5xl lg:text-6xl text-neutral-900 mb-6 leading-[1.05]">
              Entrer en
              <br />
              contact
            </h1>

            <div className="w-16 h-[1px] bg-neutral-300 mb-8"></div>

            <p className="text-neutral-600 text-lg leading-7 max-w-md">
              Pour toute question concernant mes œuvres, expositions ou collaborations,
              vous pouvez me contacter directement ou remplir le formulaire.
            </p>

            <div className="mt-10 space-y-4">

              {/* EMAIL */}
              <a
                href="mailto:sararodriguezserrano.art@gmail.com"
                className="group flex items-center justify-between bg-white border border-neutral-200 rounded-2xl px-5 py-4 hover:shadow-sm hover:-translate-y-[2px] transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                    <Mail size={18} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                      Email
                    </p>
                    <p className="text-sm text-neutral-800">
                      sararodriguezserrano.art@gmail.com
                    </p>
                  </div>
                </div>

                <ArrowRight className="text-neutral-400 group-hover:translate-x-1 transition" />
              </a>

              {/* INSTAGRAM */}
              <a
                href="https://instagram.com"
                target="_blank"
                className="group flex items-center justify-between bg-white border border-neutral-200 rounded-2xl px-5 py-4 hover:shadow-sm hover:-translate-y-[2px] transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                    <Instagram size={18} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                      Instagram
                    </p>
                    <p className="text-sm text-neutral-800">
                      @sarose_art
                    </p>
                  </div>
                </div>

                <ArrowRight className="text-neutral-400 group-hover:translate-x-1 transition" />
              </a>

              {/* LOCATION */}
              <div className="flex items-center gap-4 bg-white border border-neutral-200 rounded-2xl px-5 py-4">
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                    Localisation
                  </p>
                  <p className="text-sm text-neutral-800">
                    Montréal, Canada
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="animate-[fadeUp_.9s_ease] bg-white border border-neutral-200 rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">

            <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-2">
              Formulaire
            </p>

            <h2 className="font-serif text-3xl text-neutral-900 mb-6">
              Envoyer un message
            </h2>

            <form className="grid gap-4">

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nom"
                  className="h-12 px-4 border border-neutral-200 rounded-xl outline-none focus:border-black"
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="h-12 px-4 border border-neutral-200 rounded-xl outline-none focus:border-black"
                />
              </div>

              <input
                type="text"
                placeholder="Sujet"
                className="h-12 px-4 border border-neutral-200 rounded-xl outline-none focus:border-black"
              />

              <textarea
                placeholder="Message"
                className="h-40 px-4 py-3 border border-neutral-200 rounded-xl outline-none focus:border-black"
              />

              {/* IMAGE AJOUTÉE */}
              <div className="mt-2 overflow-hidden rounded-xl">
                <Image
                  src="/sara.jpg" // 👉 mets ton image ici dans public/
                  alt="Contact illustration"
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* BUTTON */}
              <button className="mt-2 h-12 bg-black text-white text-sm uppercase tracking-[0.25em] rounded-xl hover:bg-neutral-800 transition">
                Envoyer
              </button>

            </form>

            <p className="text-xs text-neutral-400 mt-4">
              Vous pouvez aussi nous contacter directement via email ou Instagram.
            </p>

          </div>

        </div>
      </section>

      <Footer />

      {/* ANIMATION */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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