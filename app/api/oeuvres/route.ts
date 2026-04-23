import { NextResponse } from "next/server";
import db from "../../lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM oeuvres ORDER BY id DESC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Erreur GET oeuvres:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des œuvres" },
      { status: 500 }
    );
  }
}