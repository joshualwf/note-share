import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const schoolName = formData.get("schoolName") as string;
    const courseCode = formData.get("courseCode") as string;
    const courseName = formData.get("courseName") as string;

    // Check if course already exists
    const existingCourse = await prisma.course.findFirst({
      where: {
        schoolName,
        OR: [
          { courseCode: courseCode || undefined },
          { courseName: courseName || undefined },
        ],
      },
    });

    if (existingCourse) {
      return NextResponse.json(
        { message: "Course already exists" },
        { status: 409 }
      );
    }

    // Create the post
    await prisma.course.create({
      data: {
        schoolName: schoolName,
        courseCode: courseCode,
        courseName: courseName,
      },
    });

    return NextResponse.json({ message: "Success" });

  } catch (error) {
    console.error("Course creation API error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
