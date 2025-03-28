import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    const mappedPosts = posts.map((post) => ({
      id: post.id,
      userId: post.user_id,
      schoolName: post.school_name,
      courseCode: post.course_code,
      description: post.description,
      fileKey: post.file_key,
      postType: post.post_type,
      upvoteCount: post.upvote_count,
      createdAt: post.created_at,
    }));
    
    return NextResponse.json(mappedPosts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
