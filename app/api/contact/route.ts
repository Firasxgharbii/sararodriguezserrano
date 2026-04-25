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
  let connection: mysql.Connection | null = null;

  try {
    const body = await req.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection(getDbConfig());

    await connection.execute(
      `
      INSERT INTO contact_messages (name, email, subject, message, created_at)
      VALUES (?, ?, ?, ?, NOW())
      `,
      [name, email, subject, message]
    );

    return NextResponse.json({
      success: true,
      message: "Message enregistré avec succès.",
    });
  } catch (error: any) {
    console.error("CONTACT_ERROR:", error?.message || error);

    return NextResponse.json(
      { success: false, message: error?.message || "Erreur serveur." },
      { status: 500 }
    );
  } finally {
    if (connection) await connection.end();
  }
}