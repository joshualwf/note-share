import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const school = req.nextUrl.searchParams.get("school");

  try {
    const res = await prisma.course.findMany({
      select: { courseName: true, courseCode: true },
      where: {
        schoolName: school || undefined,
      },
      orderBy: {
        courseCode: "asc",
      }
    });
    const courses = res.map((course, index) => ({
      value: course.courseCode ?? "",
      label: course.courseName ?? "",
    }));    
    return NextResponse.json(courses);
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
