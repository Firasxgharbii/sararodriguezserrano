"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function VerifyCodeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Adresse e-mail introuvable.");
      return;
    }

    if (code.length !== 6) {
      setError("Le code doit contenir 6 chiffres.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Code incorrect.");
        return;
      }

      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch {
      setError("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f1ec] flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-[32px] border border-[#e8ddd6] bg-white p-8 shadow-[0_30px_90px_rgba(0,0,0,0.08)]">
        <p className="text-[12px] uppercase tracking-[0.35em] text-[#b49686]">
          Vérification
        </p>

        <h1 className="mt-4 text-4xl font-light tracking-[-0.04em] text-[#191614]">
          Entrez le code
        </h1>

        <p className="mt-4 text-[16px] leading-8 text-[#98867f]">
          Saisissez le code à 6 chiffres envoyé à{" "}
          <strong>{email || "adresse introuvable"}</strong>
        </p>

        <form onSubmit={handleVerify} className="mt-10 space-y-6">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="123456"
            className="h-[62px] w-full rounded-[20px] border border-[#eadfd8] bg-[#faf8f6] px-5 text-center text-[28px] tracking-[0.4em] text-[#1f1b19] outline-none focus:border-[#c9afa3] focus:bg-white focus:shadow-[0_0_0_5px_rgba(201,175,163,0.12)]"
          />

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-[62px] w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#171311_0%,#1d1715_50%,#2a211d_100%)] px-6 text-[15px] font-medium uppercase tracking-[0.22em] text-white shadow-[0_18px_40px_rgba(0,0,0,0.16)] disabled:opacity-70"
          >
            {loading ? "Vérification..." : "Valider le code"}
          </button>
        </form>
      </div>
    </main>
  );
}