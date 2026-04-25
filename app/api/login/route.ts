import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

type UserRow = {
  id: number;
  full_name: string | null;
  email: string;
  password_hash: string;
  role: string;
  is_active: number;
};

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

export async function POST(req: NextRequest) {
  let db: mysql.Connection | null = null;

  try {
    const body = await req.json();

    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "").trim();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email et mot de passe requis." },
        { status: 400 }
      );
    }

    db = await mysql.createConnection(getDbConfig());

    const [rows] = await db.execute(
      `
      SELECT id, full_name, email, password_hash, role, is_active
      FROM users
      WHERE LOWER(email) = ?
      LIMIT 1
      `,
      [email]
    );

    const users = rows as UserRow[];

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: "Utilisateur introuvable." },
        { status: 401 }
      );
    }

    const user = users[0];

    if (Number(user.is_active) !== 1) {
      return NextResponse.json(
        { success: false, message: "Compte désactivé." },
        { status: 403 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Mot de passe incorrect." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Connexion réussie.",
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("LOGIN_ERROR:", error?.message || error);

    return NextResponse.json(
      { success: false, message: error?.message || "Erreur serveur." },
      { status: 500 }
    );
  } finally {
    if (db) await db.end();
  }
}