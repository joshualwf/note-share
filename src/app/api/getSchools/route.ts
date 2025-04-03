import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const res = await prisma.school.findMany({
      select: { name: true },
      orderBy: {
        name: "asc",
      },
    });
    const schools = res.map((school) => ({
      value: school.name,
      label: ""
    }));
    return NextResponse.json(schools);
  } catch (error) {
    console.error("Failed to fetch schools:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}