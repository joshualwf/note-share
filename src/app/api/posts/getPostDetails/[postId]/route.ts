import { s3 } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
): Promise<NextResponse<any>> {
  const { postId } = await params;
  const postIdNum = Number(postId);
  if (isNaN(postIdNum)) {
    return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
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
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({
      ...post,
    });
  } catch (err) {
    console.error("Failed to get post", err);
    return NextResponse.json({ message: "Post not found" }, { status: 500 });
  }
}
