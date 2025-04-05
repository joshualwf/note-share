import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const type = formData.get("type") as string;

    // Check if course already exists
    const existingSchool = await prisma.school.findFirst({
      where: {
        name
      },
    });

    if (existingSchool) {
      return NextResponse.json(
        { message: "School already exists" },
        { status: 409 }
      );
    }

    // Create the post
    await prisma.school.create({
      data: {
        name: name,
        type: type,
      },
    });

    return NextResponse.json({ message: "Success" });

  } catch (error) {
    console.error("School creation API error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
