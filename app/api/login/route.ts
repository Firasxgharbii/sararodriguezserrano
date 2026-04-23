import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "../../lib/db";

type UserRow = {
  id: number;
  full_name: string;
  email: string;
  password_hash: string;
  role: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email et mot de passe requis." },
        { status: 400 }
      );
    }

    const [rows] = await db.query(
      "SELECT id, full_name, email, password_hash, role FROM users WHERE email = ? LIMIT 1",
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
  } catch (error) {
    console.error("Erreur login:", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur." },
      { status: 500 }
    );
  }
}