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
      SELECT *
      FROM contact_messages
      ORDER BY created_at DESC
      LIMIT 100
    `);

    const [oeuvres] = await db.execute(`
      SELECT *
      FROM oeuvres
      ORDER BY id DESC
      LIMIT 100
    `);

    const [users] = await db.execute(`
      SELECT id, full_name, email, role, is_active, created_at, updated_at
      FROM users
      ORDER BY id DESC
      LIMIT 100
    `);

    const [siteContent] = await db.execute(`
      SELECT *
      FROM site_content
      ORDER BY id DESC
      LIMIT 100
    `);

    const [passwordResets] = await db.execute(`
      SELECT 
        pr.id,
        pr.user_id,
        u.email,
        pr.reset_token,
        pr.expires_at,
        pr.used_at,
        pr.created_at
      FROM password_resets pr
      LEFT JOIN users u ON u.id = pr.user_id
      ORDER BY pr.created_at DESC
      LIMIT 100
    `);

    const [userSessions] = await db.execute(`
      SELECT *
      FROM user_sessions
      ORDER BY id DESC
      LIMIT 100
    `);

    return NextResponse.json({
      success: true,
      data: {
        messages,
        oeuvres,
        users,
        siteContent,
        passwordResets,
        userSessions,
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