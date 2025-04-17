import { NextRequest } from "next/server";
import { s3 } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const postIdNum = Number(searchParams.get("postId"));

  if (isNaN(postIdNum)) {
    return new Response("Invalid post ID", { status: 400 });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postIdNum },
      select: {
        description: true,
        schoolName: true,
        courseCode: true,
        courseName: true,
        upvoteCount: true,
        createdAt: true,
        user: {
          select: {
            username: true,
            profilePicture: true,
          },
        },
      },
    });

    if (!post) {
      return new Response("post not found", { status: 404 });
    }
    console.log("post", post);
    return Response.json({
      ...post,
    });
  } catch (err) {
    console.error("Failed to get post", err);
    return new Response("Server error", { status: 500 });
  }
}
