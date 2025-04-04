import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSessionToken } from "@/lib/auth";

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
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        username,
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        admin: true,
      },
    });

    const { token, expiresAt } = await createSessionToken(String(user.id));

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      path: "/",
    });

    return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
  } catch (error: any) {
    if (error.code === "23505") {
      return NextResponse.json({ message: "Email or username already exists" }, { status: 400 });
    }
    console.error("Database Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
