import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const count = await prisma.post.count();
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Failed to count posts:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
