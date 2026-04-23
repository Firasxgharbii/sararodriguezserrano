import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const codesStore = new Map<string, { code: string; expiresAt: number }>();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email requis." },
        { status: 400 }
      );
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    codesStore.set(email, {
      code,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Sara Rodriguez Serrano" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Code de vérification",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px;">
          <h2>Code de vérification</h2>
          <p>Voici votre code :</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px;">
            ${code}
          </div>
          <p>Ce code expire dans 10 minutes.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur send-code:", error);
    return NextResponse.json(
      { success: false, message: "Impossible d’envoyer l’email." },
      { status: 500 }
    );
  }
}

export { codesStore };