import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

function getDbConfig() {
  return {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
  };
}

export async function POST(req: Request) {
  let db: mysql.Connection | null = null;

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

    db = await mysql.createConnection(getDbConfig());

    const [rows] = await db.execute(
      `
      SELECT pr.id, pr.reset_token, pr.expires_at
      FROM password_resets pr
      INNER JOIN users u ON u.id = pr.user_id
      WHERE LOWER(u.email) = ?
      ORDER BY pr.created_at DESC
      LIMIT 1
      `,
      [email]
    );

    const results = rows as {
      id: number;
      reset_token: string;
      expires_at: Date | string;
    }[];

    if (results.length === 0) {
      return NextResponse.json(
        { success: false, message: "Aucun code trouvé." },
        { status: 400 }
      );
    }

    const saved = results[0];

    if (Date.now() > new Date(saved.expires_at).getTime()) {
      return NextResponse.json(
        { success: false, message: "Le code a expiré." },
        { status: 400 }
      );
    }

    if (String(saved.reset_token).trim() !== code) {
      return NextResponse.json(
        { success: false, message: "Code incorrect." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("VERIFY_CODE_ERROR:", error?.message || error);

    return NextResponse.json(
      { success: false, message: error?.message || "Erreur serveur." },
      { status: 500 }
    );
  } finally {
    if (db) await db.end();
  }
}