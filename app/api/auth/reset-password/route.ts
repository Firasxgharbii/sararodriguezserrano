import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

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
    const password = String(body.password || "").trim();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Données manquantes." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Mot de passe trop court." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db = await mysql.createConnection(getDbConfig());

    const [result] = await db.execute(
      `UPDATE users SET password_hash = ? WHERE LOWER(email) = ?`,
      [hashedPassword, email]
    );

    const updateResult = result as mysql.ResultSetHeader;

    if (updateResult.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "Aucun utilisateur trouvé." },
        { status: 404 }
      );
    }

    await db.execute(
      `
      DELETE pr
      FROM password_resets pr
      INNER JOIN users u ON u.id = pr.user_id
      WHERE LOWER(u.email) = ?
      `,
      [email]
    );

    return NextResponse.json({
      success: true,
      message: "Mot de passe mis à jour avec succès.",
    });
  } catch (error: any) {
    console.error("RESET_PASSWORD_ERROR:", error?.message || error);

    return NextResponse.json(
      { success: false, message: error?.message || "Erreur serveur." },
      { status: 500 }
    );
  } finally {
    if (db) await db.end();
  }
}