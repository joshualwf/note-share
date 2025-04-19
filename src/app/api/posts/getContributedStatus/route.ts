import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const userId = searchParams.get("userId") || undefined;

  const where: any = {};

  if (userId) {
    where.userId = Number(userId);
  } else {
    return NextResponse.json({ hasContributed: false });
  }

  const exists = await prisma.post.findFirst({
    where,
    select: { id: true },
  });
  return NextResponse.json({ hasContributed: !!exists });
}
