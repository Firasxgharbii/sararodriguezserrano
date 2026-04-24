import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

function getDbConfig() {
  return {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email || "").trim().toLowerCase();
    const code = String(body.code || "").trim();

    if (!email || !code) {
      return NextResponse.json(
        { success: false, message: "Email ou code manquant." },
        { status: 400 }
      );
    }

    const db = await mysql.createConnection(getDbConfig());

    const [rows] = await db.execute(
      `
      SELECT id, code, expires_at
      FROM password_resets
      WHERE LOWER(email) = ?
      ORDER BY created_at DESC
      LIMIT 1
      `,
      [email]
    );

    await db.end();

    const results = rows as {
      id: number;
      code: string;
      expires_at: Date | string;
    }[];

    if (results.length === 0) {
      return NextResponse.json(
        { success: false, message: "Aucun code trouvé." },
        { status: 400 }
      );
    }

    const saved = results[0];
    const expiresAt = new Date(saved.expires_at).getTime();

    if (Date.now() > expiresAt) {
      return NextResponse.json(
        { success: false, message: "Le code a expiré." },
        { status: 400 }
      );
    }

    if (String(saved.code).trim() !== code) {
      return NextResponse.json(
        { success: false, message: "Code incorrect." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("VERIFY_CODE_ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Erreur serveur." },
      { status: 500 }
    );
  }
}