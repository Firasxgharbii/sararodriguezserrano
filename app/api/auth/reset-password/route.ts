import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

export async function POST(req: Request) {
  let connection;

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email et mot de passe requis." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [result] = await connection.execute(
      "UPDATE users SET password_hash = ?, updated_at = NOW() WHERE email = ?",
      [hashedPassword, email]
    );

    const updateResult = result as mysql.ResultSetHeader;

    if (updateResult.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "Utilisateur introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Mot de passe mis à jour avec succès.",
    });
  } catch (error) {
    console.error("Erreur reset-password:", error);

    return NextResponse.json(
      { success: false, message: "Erreur serveur." },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}