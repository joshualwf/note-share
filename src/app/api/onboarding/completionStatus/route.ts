import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const cookie = req.headers.get("cookie");
  if (!cookie) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }
  const session = await decrypt(cookie);
  if (!session?.userId) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  const userId = Number(session.userId);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      onboardingCompleted: true,
      admin: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({
    user,
    isOnboardingCompleted: user.onboardingCompleted,
    isAdmin: user.admin,
  });
}
