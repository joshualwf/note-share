import { query } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password, username } = req.body;

  // Validate input
  if (!email || !password || !username) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert into PostgreSQL
    const result = await query(
      "INSERT INTO users (email, password_hash, username) VALUES ($1, $2, $3) RETURNING id, email, username, created_at, admin",
      [email, hashedPassword, username]
    );

    res.status(201).json({ message: "User created successfully", user: result[0] });
  } catch (error: any) {
    if (error.code === "23505") {
      return res.status(400).json({ message: "Email or username already exists" });
    }
    console.error("Database Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
