import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
    }

    // Fetch user from database
    const user = await query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.length === 0) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user[0].password_hash);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    // Generate JWT token
    const token = sign(
      { id: user[0].id, email: user[0].email, username: user[0].username },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Set cookie in response
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user[0].id,
        email: user[0].email,
        username: user[0].username,
        profile_picture: user[0].profile_picture,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
