import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
): Promise<NextResponse<any>> {
  const { commentId } = await params;
  const commentIdNum = Number(commentId);
  if (isNaN(commentIdNum)) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 400 }
    );
  }

  const user = await getUserFromCookie();
  if (!user) {
    return NextResponse.json(
      { message: "Please login/signup to like" },
      { status: 401 }
    );
  }

  const userId = Number(user.id);

  try {
    const existingUpvote = await prisma.commentUpvote.findUnique({
      where: {
        userId_commentId: {
          userId,
          commentId: commentIdNum,
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
