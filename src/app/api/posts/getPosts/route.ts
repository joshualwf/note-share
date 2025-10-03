import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam) : undefined;
  const school = searchParams.get("school") || undefined;
  const courseCode = searchParams.get("courseCode") || undefined;
  const courseName = searchParams.get("courseName") || undefined;
  const search = searchParams.get("search")?.toLowerCase() || "";
  const resourceTypes = JSON.parse(searchParams.get("resourceTypes") || "[]");
  const sortBy = searchParams.get("sortBy") || "Popularity";
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam) : undefined;
  const skip = page && limit ? (page - 1) * limit : undefined;

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

  const [posts, totalCount] = await Promise.all([
    prisma.post.findMany({
      where,
      ...(skip !== undefined && { skip }),
      ...(limit !== undefined && { take: limit }),
      orderBy:
        sortBy === "Likes"
          ? { upvoteCount: "desc" }
          : sortBy === "Views"
          ? { viewCount: "desc" }
          : { createdAt: "desc" },
      select: {
        id: true,
        userId: true,
        description: true,
        schoolName: true,
        courseCode: true,
        courseName: true,
        fileKey: true,
        postType: true,
        upvoteCount: true,
        viewCount: true,
        createdAt: true,
      },
    }),
    prisma.post.count({ where }),
  ]);
  return NextResponse.json({ posts, totalCount });
}
