"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Adresse e-mail introuvable.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/reset-password", {
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
        setError(data.message || "Impossible de réinitialiser le mot de passe.");
        return;
      }

      setSuccess("Mot de passe mis à jour avec succès.");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      setError("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f1ec] flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-[32px] border border-[#e8ddd6] bg-white p-8 shadow-[0_30px_90px_rgba(0,0,0,0.08)]">
        <p className="text-[12px] uppercase tracking-[0.35em] text-[#b49686]">
          Nouveau mot de passe
        </p>

        <h1 className="mt-4 text-4xl font-light tracking-[-0.04em] text-[#191614]">
          Définir un nouveau mot de passe
        </h1>

        <p className="mt-4 text-[16px] leading-8 text-[#98867f]">
          Compte concerné : <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-[62px] w-full rounded-[20px] border border-[#eadfd8] bg-[#faf8f6] px-5 text-[16px] text-[#1f1b19] outline-none focus:border-[#c9afa3] focus:bg-white"
          />

          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-[62px] w-full rounded-[20px] border border-[#eadfd8] bg-[#faf8f6] px-5 text-[16px] text-[#1f1b19] outline-none focus:border-[#c9afa3] focus:bg-white"
          />

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-[62px] w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#171311_0%,#1d1715_50%,#2a211d_100%)] px-6 text-[15px] font-medium uppercase tracking-[0.22em] text-white shadow-[0_18px_40px_rgba(0,0,0,0.16)] disabled:opacity-70"
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </form>
      </div>
    </main>
  );
}