import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
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

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email requis." },
        { status: 400 }
      );
    }

    db = await mysql.createConnection(getDbConfig());

    const [users] = await db.execute(
      `SELECT id, email FROM users WHERE LOWER(email) = ? LIMIT 1`,
      [email]
    );

    const userRows = users as { id: number; email: string }[];

    if (userRows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Aucun utilisateur trouvé avec cet email." },
        { status: 404 }
      );
    }

    const user = userRows[0];
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await db.execute(`DELETE FROM password_resets WHERE user_id = ?`, [user.id]);

    await db.execute(
      `
      INSERT INTO password_resets (user_id, reset_token, expires_at)
      VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE))
      `,
      [user.id, code]
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Sara Rodriguez Serrano" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Code de vérification",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px;">
          <h2>Code de vérification</h2>
          <p>Voici votre code :</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px;">
            ${code}
          </div>
          <p>Ce code expire dans 10 minutes.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("SEND_CODE_ERROR:", error?.message || error);

    return NextResponse.json(
      { success: false, message: error?.message || "Impossible d’envoyer l’email." },
      { status: 500 }
    );
  } finally {
    if (db) await db.end();
  }
}