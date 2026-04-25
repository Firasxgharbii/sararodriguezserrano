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

export async function GET() {
  let db: mysql.Connection | null = null;

  try {
    db = await mysql.createConnection(getDbConfig());

    const [messages] = await db.execute(`
      SELECT id, name, email, subject, message, created_at
      FROM contact_messages
      ORDER BY created_at DESC
      LIMIT 50
    `);

    const [oeuvres] = await db.execute(`
      SELECT id, title, year, category, availability, image, created_at
      FROM oeuvres
      ORDER BY id DESC
      LIMIT 50
    `);

    const [users] = await db.execute(`
      SELECT id, full_name, email, role, is_active, created_at
      FROM users
      ORDER BY id DESC
      LIMIT 50
    `);

    return NextResponse.json({
      success: true,
      data: {
        messages,
        oeuvres,
        users,
      },
    });
  } catch (error: any) {
    console.error("DASHBOARD_DATABASE_ERROR:", error?.message || error);

    return NextResponse.json(
      { success: false, message: error?.message || "Erreur serveur." },
      { status: 500 }
    );
  } finally {
    if (db) await db.end();
  }
}