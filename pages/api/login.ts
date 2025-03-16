import { query } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Fetch user from database
    const user = await query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Compare the password with hashed password in DB
    const isPasswordValid = await bcrypt.compare(password, user[0].password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT Token
    const token = sign(
      { id: user[0].id, email: user[0].email, username: user[0].username },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Return user data & token
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user[0].id,
        email: user[0].email,
        username: user[0].username,
        profile_picture: user[0].profile_picture,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
