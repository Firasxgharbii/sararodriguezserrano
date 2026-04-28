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

export async function GET() {
  let db: mysql.Connection | null = null;

  try {
    db = await mysql.createConnection(getDbConfig());

    const [rows] = await db.execute<any[]>(
      `
      SELECT field_value
      FROM site_content
      WHERE page_name = ? 
        AND section_name = ? 
        AND field_name = ?
      LIMIT 1
      `,
      ["global", "content", "json"]
    );

    if (!rows.length || !rows[0].field_value) {
      return NextResponse.json(null);
    }

    return NextResponse.json(JSON.parse(rows[0].field_value));
  } catch (error) {
    console.error("GET /api/site-content error:", error);

    return NextResponse.json(
      { error: "Erreur lecture site_content" },
      { status: 500 }
    );
  } finally {
    if (db) await db.end();
  }
}

export async function POST(req: Request) {
  let db: mysql.Connection | null = null;

  try {
    const content = await req.json();

    db = await mysql.createConnection(getDbConfig());

    await db.execute(
      `
      INSERT INTO site_content 
        (page_name, section_name, field_name, field_value)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        field_value = VALUES(field_value),
        updated_at = CURRENT_TIMESTAMP
      `,
      ["global", "content", "json", JSON.stringify(content)]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/site-content error:", error);

    return NextResponse.json(
      { error: "Erreur sauvegarde site_content" },
      { status: 500 }
    );
  } finally {
    if (db) await db.end();
  }
}