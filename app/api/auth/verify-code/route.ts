import { NextResponse } from "next/server";
import { codesStore } from "../send-code/route";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { success: false, message: "Email ou code manquant." },
        { status: 400 }
      );
    }

    const saved = codesStore.get(email);

    if (!saved) {
      return NextResponse.json(
        { success: false, message: "Aucun code trouvé." },
        { status: 400 }
      );
    }

    if (Date.now() > saved.expiresAt) {
      codesStore.delete(email);
      return NextResponse.json(
        { success: false, message: "Le code a expiré." },
        { status: 400 }
      );
    }

    if (saved.code !== code) {
      return NextResponse.json(
        { success: false, message: "Code incorrect." },
        { status: 400 }
      );
    }

    codesStore.delete(email);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erreur serveur." },
      { status: 500 }
    );
  }
}