import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json();

    // Validate input
    if (!email || !password || !username) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert into PostgreSQL
    const result = await query(
      "INSERT INTO users (email, password_hash, username) VALUES ($1, $2, $3) RETURNING id, email, username, created_at, admin",
      [email, hashedPassword, username]
    );

    return NextResponse.json({ message: "User created successfully", user: result[0] }, { status: 201 });
  } catch (error: any) {
    if (error.code === "23505") {
      return NextResponse.json({ message: "Email or username already exists" }, { status: 400 });
    }
    console.error("Database Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
