"use client";

import { useEffect, useState } from "react";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import { Mail, Instagram, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  defaultSiteContent,
  type SiteContent,
  type Lang,
  LANG_STORAGE_KEY,
} from "../lib/siteContent";
import { getSiteContent } from "../lib/getSiteContent";
import { t } from "../lib/i18n";

const futuraLight = {
  fontFamily:
    '"FuturaLightCustom", "Futura W02 Light", "Futura PT", Futura, "Avenir Next", "Helvetica Neue", Arial, sans-serif',
  fontWeight: 300,
};

const softCardShadow = "shadow-[0_18px_45px_rgba(120,120,120,0.10)]";

export default function ContactPage() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [lang, setLang] = useState<Lang>("fr");

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadContent = () => {
      const stored = getSiteContent();

      setContent({
        ...defaultSiteContent,
        ...stored,
        contact: {
          ...defaultSiteContent.contact,
          ...(stored.contact ?? {}),
          contactImage: {
            ...defaultSiteContent.contact.contactImage,
            ...(stored.contact?.contactImage ?? {}),
          },
        },
      });

      const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;
      setLang(
        savedLang === "fr" || savedLang === "en" || savedLang === "es"
          ? savedLang
          : "fr"
      );
    };

    loadContent();

    window.addEventListener("focus", loadContent);
    window.addEventListener("storage", loadContent);

    return () => {
      window.removeEventListener("focus", loadContent);
      window.removeEventListener("storage", loadContent);
    };
  }, []);

  const contact = content.contact;
  const contactImageSrc =
    contact.contactImage?.src || defaultSiteContent.contact.contactImage.src;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError("Erreur lors de l'envoi.");
        return;
      }

      setSuccess("Message envoyé !");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf8f4]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          
          {/* LEFT */}
          <div>
            <h1
              className="mb-6 text-[34px] leading-tight text-[#8a8a8a]"
              style={futuraLight}
            >
              {t(contact.title, lang)}
            </h1>

            <p className="mb-10 max-w-md text-[15px] text-neutral-600">
              {t(contact.text, lang)}
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${contact.email}`}
                className={`flex items-center justify-between border bg-white px-5 py-4 ${softCardShadow}`}
              >
                <div className="flex items-center gap-4">
                  <Mail size={18} />
                  <span>{contact.email}</span>
                </div>
                <ArrowRight />
              </a>

              <a
                href="https://www.instagram.com/sara_rodriguez_serrano/"
                target="_blank"
                className={`flex items-center justify-between border bg-white px-5 py-4 ${softCardShadow}`}
              >
                <div className="flex items-center gap-4">
                  <Instagram size={18} />
                  <span>{contact.instagram}</span>
                </div>
                <ArrowRight />
              </a>

              <div
                className={`flex items-center gap-4 border bg-white px-5 py-4 ${softCardShadow}`}
              >
                <MapPin size={18} />
                <span>Montréal, Canada</span>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className={`border bg-white p-6 ${softCardShadow}`}>
            <h2
              className="mb-6 text-[34px] leading-tight text-[#8a8a8a]"
              style={futuraLight}
            >
              Envoyer un message
            </h2>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                name="name"
                placeholder="Nom"
                value={form.name}
                onChange={handleChange}
                className="h-12 border px-4"
              />

              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="h-12 border px-4"
              />

              <input
                name="subject"
                placeholder="Sujet"
                value={form.subject}
                onChange={handleChange}
                className="h-12 border px-4"
              />

              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                className="h-32 border px-4 py-2"
              />

              <Image
                src={contactImageSrc}
                alt="contact"
                width={800}
                height={400}
                className="h-40 w-full object-cover"
              />

              <button className="h-12 border">
                {loading ? "..." : "Envoyer"}
              </button>

              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}