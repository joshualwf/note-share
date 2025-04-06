import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ message: "No session" }, { status: 401 });
    }
    const session = await decrypt(sessionCookie);
    if (!session?.userId) {
      return NextResponse.json({ message: "Invalid session" }, { status: 401 });
    }

    const { username } = await req.json();

    // Validation
    if (!username || typeof username !== "string") {
      return NextResponse.json(
        { message: "Username is required" },
        { status: 400 }
      );
    }

    if (username.includes(" ")) {
      return NextResponse.json(
        { message: "Username must be one word" },
        { status: 400 }
      );
    }

    if (username.length < 5) {
      return NextResponse.json(
        { message: "Username too short (minimum 5 characters)" },
        { status: 400 }
      );
    }

    if (username.length > 20) {
      return NextResponse.json(
        { message: "Username too long (max 20 characters)" },
        { status: 400 }
      );
    }

    // Check uniqueness
    const existing = await prisma.user.findUnique({
      where: { username },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Username already taken" },
        { status: 400 }
      );
    }
    const userId = Number(session.userId);
    // Update user
    await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        onboardingCompleted: true,
      },
    });

    return NextResponse.json(
      { message: "Onboarding completed" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Onboarding submit error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
