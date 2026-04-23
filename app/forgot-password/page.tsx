"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Veuillez entrer votre adresse e-mail.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Impossible d’envoyer le code.");
        return;
      }

      router.push(`/verify-code?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f1ec]">
      <div className="absolute inset-0">
        <div className="absolute left-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-[#ead8ce]/70 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-90px] h-[340px] w-[340px] rounded-full bg-[#ddd6cf]/70 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-3xl" />
      </div>

      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[34px] border border-[#e8ddd6] bg-white/78 shadow-[0_30px_90px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:grid-cols-[1.02fr_1.15fr]">
          <div className="relative hidden overflow-hidden lg:block">
            <div className="absolute inset-0 bg-[linear-gradient(145deg,#0f0f10_0%,#1b1715_42%,#4d4037_100%)]" />
            <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#b89d8c]/10 blur-3xl" />
            <div className="absolute left-10 bottom-16 h-32 w-32 rounded-full bg-[#f1dfcf]/5 blur-2xl" />

            <div className="relative flex h-full flex-col justify-between px-12 py-14 text-white xl:px-14 xl:py-16">
              <div className="max-w-[420px] animate-[fadeUp_0.8s_ease_forwards] opacity-0">
                <p className="text-[11px] uppercase tracking-[0.42em] text-white/42">
                  Assistance
                </p>

                <div className="mt-10 space-y-3">
                  <h1 className="text-[68px] font-light leading-[0.92] tracking-[-0.06em] text-white">
                    Retrouver
                  </h1>

                  <p className="font-serif text-[56px] italic leading-[0.95] tracking-[-0.03em] text-[#f0dccb]">
                    votre accès
                  </p>
                </div>

                <p className="mt-12 max-w-[390px] text-[18px] leading-10 text-white/80">
                  Entrez votre adresse e-mail pour recevoir un code de
                  vérification à 6 chiffres.
                </p>
              </div>

              <div className="max-w-[360px] rounded-[30px] border border-white/10 bg-white/6 p-8 backdrop-blur-md animate-[fadeUp_1s_ease_forwards] opacity-0">
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                  Récupération sécurisée
                </p>

                <div className="mt-6 h-px w-14 bg-white/12" />

                <p className="mt-8 text-[16px] leading-9 text-white/72">
                  Un code unique vous sera envoyé afin de confirmer votre
                  identité avant de définir un nouveau mot de passe.
                </p>
              </div>
            </div>
          </div>

          <div className="relative bg-[#fcfaf8]/90 px-6 py-10 sm:px-10 md:px-14 lg:px-14 lg:py-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.78),transparent_42%)]" />

            <div className="relative z-10">
              <div className="animate-[fadeUp_0.7s_ease_forwards] opacity-0">
                <p className="text-[12px] uppercase tracking-[0.35em] text-[#b49686]">
                  Récupération
                </p>

                <h2 className="mt-5 max-w-md text-5xl font-light leading-[1] tracking-[-0.05em] text-[#1a1715] sm:text-6xl">
                  Mot de passe oublié
                </h2>

                <p className="mt-6 max-w-lg text-[16px] leading-8 text-[#98867f]">
                  Indiquez votre adresse e-mail afin de recevoir un code de
                  vérification sécurisé.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-12 space-y-8 animate-[fadeUp_0.95s_ease_forwards] opacity-0"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="mb-3 block text-[15px] font-medium text-[#5f534d]"
                  >
                    Adresse e-mail
                  </label>

                  <div className="group flex h-[62px] items-center gap-3 rounded-[20px] border border-[#eadfd8] bg-[#faf8f6] px-5 transition-all duration-300 focus-within:-translate-y-[1px] focus-within:border-[#c9afa3] focus-within:bg-white focus-within:shadow-[0_0_0_5px_rgba(201,175,163,0.12)]">
                    <Mail className="h-5 w-5 text-[#b69c90] transition duration-300 group-focus-within:text-[#7e675d]" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nom@exemple.com"
                      className="w-full bg-transparent text-[15px] text-[#1f1b19] outline-none placeholder:text-[#c3b4ad]"
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex h-[62px] w-full items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#171311_0%,#1d1715_50%,#2a211d_100%)] px-6 text-[15px] font-medium uppercase tracking-[0.22em] text-white shadow-[0_18px_40px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_24px_55px_rgba(0,0,0,0.22)] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.16)_50%,transparent_80%)] transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative z-10">
                    {loading ? "Envoi en cours..." : "Envoyer le code"}
                  </span>
                </button>
              </form>

              <div className="mt-8 animate-[fadeUp_1.1s_ease_forwards] opacity-0">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-[15px] text-[#8e7f79] transition hover:translate-x-[-2px] hover:text-[#5f473d]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour à la connexion
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
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