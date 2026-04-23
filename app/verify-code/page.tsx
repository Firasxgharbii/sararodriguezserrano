"use client";

import { Suspense } from "react";
import VerifyCodeContent from "./VerifyCodeContent";

export default function VerifyCodePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f5f1ec] flex items-center justify-center px-4">
          <div className="w-full max-w-xl rounded-[32px] border border-[#e8ddd6] bg-white p-8 shadow-[0_30px_90px_rgba(0,0,0,0.08)]">
            <p className="text-[12px] uppercase tracking-[0.35em] text-[#b49686]">
              Vérification
            </p>

            <h1 className="mt-4 text-4xl font-light tracking-[-0.04em] text-[#191614]">
              Entrez le code
            </h1>

            <p className="mt-4 text-[16px] leading-8 text-[#98867f]">
              Chargement...
            </p>
          </div>
        </main>
      }
    >
      <VerifyCodeContent />
    </Suspense>
  );
}