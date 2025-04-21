import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
): Promise<NextResponse<any>> {
  const { postId } = await params;
  const postIdNum = Number(postId);

  if (isNaN(postIdNum)) {
    return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
  }

  const user = await getUserFromCookie();
  if (!user) {
    return NextResponse.json({ hasLiked: false }, { status: 200 });
  }

  const userId = Number(user.id);

  try {
    const existingUpvote = await prisma.postUpvote.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: postIdNum,
        },
      },
    });

    return NextResponse.json({ hasLiked: !!existingUpvote });
  } catch (err) {
    console.error("Error checking upvote status:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
