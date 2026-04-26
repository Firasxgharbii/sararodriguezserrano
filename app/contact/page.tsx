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

  const uiText = {
    emailLabel: { fr: "Email", en: "Email", es: "Correo electrónico" },
    instagramLabel: { fr: "Instagram", en: "Instagram", es: "Instagram" },
    locationLabel: { fr: "Localisation", en: "Location", es: "Ubicación" },
    locationValue: {
      fr: "Montréal, Canada",
      en: "Montreal, Canada",
      es: "Montreal, Canadá",
    },
    formBadge: { fr: "Formulaire", en: "Form", es: "Formulario" },
    formTitle: {
      fr: "Envoyer un message",
      en: "Send a message",
      es: "Enviar un mensaje",
    },
    namePlaceholder: { fr: "Nom", en: "Name", es: "Nombre" },
    emailPlaceholder: { fr: "Email", en: "Email", es: "Correo electrónico" },
    subjectPlaceholder: { fr: "Sujet", en: "Subject", es: "Asunto" },
    messagePlaceholder: { fr: "Message", en: "Message", es: "Mensaje" },
    fillAllFields: {
      fr: "Veuillez remplir tous les champs.",
      en: "Please fill in all fields.",
      es: "Por favor complete todos los campos.",
    },
    sendError: {
      fr: "Impossible d’envoyer le message.",
      en: "Unable to send the message.",
      es: "No se pudo enviar el mensaje.",
    },
    genericError: {
      fr: "Une erreur est survenue.",
      en: "An error occurred.",
      es: "Ocurrió un error.",
    },
    success: {
      fr: "Votre message a bien été enregistré.",
      en: "Your message has been successfully sent.",
      es: "Su mensaje ha sido enviado correctamente.",
    },
    sending: { fr: "Envoi...", en: "Sending...", es: "Enviando..." },
    send: { fr: "Envoyer", en: "Send", es: "Enviar" },
    contactNote: {
      fr: "Vous pouvez aussi nous contacter directement via email ou Instagram.",
      en: "You can also contact us directly via email or Instagram.",
      es: "También puede contactarnos directamente por correo electrónico o Instagram.",
    },
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!form.name || !form.email || !form.subject || !form.message) {
      setError(t(uiText.fillAllFields, lang));
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
        setError(data.message || t(uiText.sendError, lang));
        return;
      }

      setSuccess(t(uiText.success, lang));
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError(t(uiText.genericError, lang));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf8f4]">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p
                className="mb-4 text-xs uppercase tracking-[0.4em] text-neutral-400"
                style={futuraLight}
              >
                {t(contact.badge, lang)}
              </p>

              <h1
                className="mb-6 text-[44px] leading-[1.05] text-[#8a8a8a] sm:text-[58px] lg:text-[68px]"
                style={{
                  ...futuraLight,
                  letterSpacing: "0.03em",
                }}
              >
                {t(contact.title, lang)}
              </h1>

              <div className="mb-8 h-[1px] w-16 bg-neutral-300" />

              <p className="max-w-md text-[16px] leading-8 text-neutral-600">
                {t(contact.text, lang)}
              </p>

              <div className="mt-10 space-y-4">
                <a
                  href={`mailto:${contact.email}`}
                  className={`group flex items-center justify-between border border-neutral-200 bg-white px-5 py-4 transition duration-300 hover:-translate-y-[2px] ${softCardShadow}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center bg-neutral-100 text-neutral-700">
                      <Mail size={18} />
                    </div>

                    <div>
                      <p
                        className="text-xs uppercase tracking-[0.25em] text-neutral-400"
                        style={futuraLight}
                      >
                        {t(uiText.emailLabel, lang)}
                      </p>
                      <p className="break-all text-sm text-neutral-800">
                        {contact.email}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="text-neutral-400 transition group-hover:translate-x-1" />
                </a>

                <a
                  href="https://www.instagram.com/sara_rodriguez_serrano/"
                  target="_blank"
                  rel="noreferrer"
                  className={`group flex items-center justify-between border border-neutral-200 bg-white px-5 py-4 transition duration-300 hover:-translate-y-[2px] ${softCardShadow}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center bg-neutral-100 text-neutral-700">
                      <Instagram size={18} />
                    </div>

                    <div>
                      <p
                        className="text-xs uppercase tracking-[0.25em] text-neutral-400"
                        style={futuraLight}
                      >
                        {t(uiText.instagramLabel, lang)}
                      </p>
                      <p className="text-sm text-neutral-800">
                        {contact.instagram}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="text-neutral-400 transition group-hover:translate-x-1" />
                </a>

                <div
                  className={`flex items-center gap-4 border border-neutral-200 bg-white px-5 py-4 ${softCardShadow}`}
                >
                  <div className="flex h-10 w-10 items-center justify-center bg-neutral-100 text-neutral-700">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <p
                      className="text-xs uppercase tracking-[0.25em] text-neutral-400"
                      style={futuraLight}
                    >
                      {t(uiText.locationLabel, lang)}
                    </p>
                    <p className="text-sm text-neutral-800">
                      {t(uiText.locationValue, lang)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`border border-neutral-200 bg-white p-6 sm:p-7 ${softCardShadow}`}
            >
              <p
                className="mb-2 text-xs uppercase tracking-[0.3em] text-neutral-400"
                style={futuraLight}
              >
                {t(uiText.formBadge, lang)}
              </p>

              <h2
                className="mb-6 text-[34px] leading-tight text-[#8a8a8a]"
                style={futuraLight}
              >
                {t(uiText.formTitle, lang)}
              </h2>

              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t(uiText.namePlaceholder, lang)}
                    className="h-12 border border-neutral-200 bg-white px-4 outline-none transition focus:border-neutral-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t(uiText.emailPlaceholder, lang)}
                    className="h-12 border border-neutral-200 bg-white px-4 outline-none transition focus:border-neutral-400"
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder={t(uiText.subjectPlaceholder, lang)}
                  className="h-12 border border-neutral-200 bg-white px-4 outline-none transition focus:border-neutral-400"
                />

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t(uiText.messagePlaceholder, lang)}
                  className="h-40 border border-neutral-200 bg-white px-4 py-3 outline-none transition focus:border-neutral-400"
                />

                <div className="mt-2 overflow-hidden border border-neutral-100 bg-white">
                  <Image
                    src={contactImageSrc}
                    alt="Contact illustration"
                    width={800}
                    height={400}
                    className="h-48 w-full object-cover"
                  />
                </div>

                {error && (
                  <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 h-12 border border-neutral-200 bg-white text-sm uppercase tracking-[0.25em] text-neutral-700 transition duration-300 hover:border-neutral-400 hover:bg-neutral-50 disabled:opacity-70"
                  style={futuraLight}
                >
                  {loading ? t(uiText.sending, lang) : t(uiText.send, lang)}
                </button>
              </form>

              <p className="mt-4 text-xs text-neutral-400">
                {t(uiText.contactNote, lang)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @font-face {
          font-family: "FuturaLightCustom";
          src: url("/fonts/Futura-Light.woff2") format("woff2");
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }
      `}</style>

      <Footer />
    </main>
  );
}