import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const page = parseInt(searchParams.get("page") || "1");
  const limit = 5;
  const skip = (page - 1) * limit;

  const school = searchParams.get("school") || undefined;
  const courseCode = searchParams.get("courseCode") || undefined;
  const courseName = searchParams.get("courseName") || undefined;
  const search = searchParams.get("search")?.toLowerCase() || "";
  const resourceTypes = JSON.parse(searchParams.get("resourceTypes") || "[]");
  const sortBy = searchParams.get("sortBy") || "Popularity";

  const where: any = {};

  if (school) {
    where.schoolName = { contains: school, mode: "insensitive" };
  }
  if (courseCode) {
    where.courseCode = { contains: courseCode, mode: "insensitive" };
  }
  if (courseName) {
    where.courseName = { contains: courseName, mode: "insensitive" };
  }
  if (search) {
    where.OR = [
      { description: { contains: search, mode: "insensitive" } },
      { schoolName: { contains: search, mode: "insensitive" } },
      { courseCode: { contains: search, mode: "insensitive" } },
      { courseName: { contains: search, mode: "insensitive" } },
    ];
  }
  if (resourceTypes.length > 0) {
    where.postType = { in: resourceTypes };
  }
  console.log("Where filter:", where);

  const [posts, totalCount] = await Promise.all([
    prisma.post.findMany({
      where,
      skip,
      take: limit,
      orderBy: sortBy === "Popularity" ? { upvoteCount: "desc" } : { createdAt: "desc" },
    }),
    prisma.post.count({ where }),
  ]);

  return NextResponse.json({ posts, totalCount });
}

