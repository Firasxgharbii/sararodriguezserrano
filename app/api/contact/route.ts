import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req: Request) {
  let connection: mysql.Connection | null = null;

  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

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
  } catch (error) {
    console.error("Erreur contact:", error);

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