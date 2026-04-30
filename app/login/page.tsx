"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "Connexion impossible.");
        setLoading(false);
        return;
      }

      localStorage.setItem("admin_user", JSON.stringify(data.user));
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setErrorMsg("Une erreur est survenue lors de la connexion.");
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f1eb]">
      <div className="absolute inset-0">
        <div className="absolute left-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-[#ead7cc]/70 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-100px] h-[340px] w-[340px] rounded-full bg-[#ddd6cf]/70 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-3xl" />
      </div>

      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[36px] border border-[#e8ddd6] bg-white/75 shadow-[0_30px_90px_rgba(0,0,0,0.10)] backdrop-blur-xl lg:grid-cols-2">
          <div className="relative hidden overflow-hidden lg:block">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#111111_0%,#1c1714_38%,#4e4138_100%)]" />
            <div className="absolute -left-10 top-20 h-52 w-52 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-10 right-0 h-64 w-64 rounded-full bg-[#b79c8b]/10 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between p-12 text-white">
              <div className="animate-[fadeUp_0.9s_ease_forwards] opacity-0">
                <p className="text-[12px] uppercase tracking-[0.35em] text-white/50">
                  Espace privé
                </p>

                <h1 className="mt-8 max-w-md text-6xl font-light leading-[0.95] tracking-[-0.05em]">
                  Entrez dans
                </h1>

                <p className="mt-3 font-serif text-5xl italic leading-none text-[#f0dccb]">
                  votre univers
                </p>

                <p className="mt-10 max-w-md text-[17px] leading-9 text-white/74">
                  Retrouvez un espace pensé avec exigence — sobre dans sa forme,
                  précis dans son expérience, et conçu pour prolonger l’identité
                  de la maison avec justesse.
                </p>
              </div>

              <div className="animate-[fadeUp_1.15s_ease_forwards] opacity-0 rounded-[28px] border border-white/10 bg-white/6 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md">
                <p className="text-[12px] uppercase tracking-[0.35em] text-white/40">
                  Signature digitale
                </p>

                <p className="mt-5 text-[15px] leading-9 text-white/76">
                  Un accès discret, élégant et fluide, imaginé pour préserver la
                  cohérence visuelle de l’univers Sara Rodriguez Serrano jusque
                  dans les moindres détails.
                </p>
              </div>
            </div>
          </div>

          <div className="relative bg-[#fcfbfa] px-6 py-8 sm:px-10 md:px-14 lg:px-16 lg:py-12">
            <div className="mx-auto flex min-h-full w-full max-w-xl flex-col justify-center">
              <div className="animate-[fadeUp_0.8s_ease_forwards] opacity-0">
                <p className="text-[12px] uppercase tracking-[0.35em] text-[#b49686]">
                  Connexion
                </p>

                <h2 className="mt-5 max-w-md text-5xl font-light leading-[1] tracking-[-0.05em] text-[#1a1715] sm:text-6xl">
                  Accéder à votre espace
                </h2>

                <p className="mt-6 max-w-lg text-[16px] leading-8 text-[#9a8780]">
                  Renseignez vos identifiants pour retrouver un accès personnel,
                  confidentiel et soigneusement intégré à l’expérience du site.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-12 space-y-7 animate-[fadeUp_1s_ease_forwards] opacity-0"
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
                      autoComplete="email"
                      className="w-full bg-transparent text-[15px] text-[#1f1b19] outline-none placeholder:text-[#c3b4ad]"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <label
                      htmlFor="password"
                      className="block text-[15px] font-medium text-[#5f534d]"
                    >
                      Mot de passe
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-[14px] text-[#b08b75] transition hover:text-[#6f564a]"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>

                  <div className="group flex h-[62px] items-center gap-3 rounded-[20px] border border-[#eadfd8] bg-[#faf8f6] px-5 transition-all duration-300 focus-within:-translate-y-[1px] focus-within:border-[#c9afa3] focus-within:bg-white focus-within:shadow-[0_0_0_5px_rgba(201,175,163,0.12)]">
                    <Lock className="h-5 w-5 text-[#b69c90] transition duration-300 group-focus-within:text-[#7e675d]" />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      autoComplete="current-password"
                      className="w-full bg-transparent text-[15px] text-[#1f1b19] outline-none placeholder:text-[#c3b4ad]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-[#b1998e] transition hover:scale-105 hover:text-[#6e5a52]"
                      aria-label={
                        showPassword
                          ? "Masquer le mot de passe"
                          : "Afficher le mot de passe"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-[18px] w-[18px] rounded border-[#d8cbc4] accent-black"
                  />

                  <label
                    htmlFor="remember"
                    className="text-[15px] text-[#8e7f79]"
                  >
                    Garder ma session active
                  </label>
                </div>

                {errorMsg && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative mt-2 inline-flex h-[62px] w-full items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#171311_0%,#1d1715_50%,#2a211d_100%)] px-6 text-[15px] font-medium uppercase tracking-[0.28em] text-white shadow-[0_18px_40px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_24px_55px_rgba(0,0,0,0.22)] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.16)_50%,transparent_80%)] transition-transform duration-700 group-hover:translate-x-full" />

                  <span className="relative z-10">
                    {loading ? "Connexion..." : "Connexion"}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(26px);
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