import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const commentIdNum = Number(searchParams.get("commentId"));
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

    if (existingUpvote) {
      // Remove the upvote
      await prisma.commentUpvote.delete({
        where: {
          userId_commentId: {
            userId,
            commentId: commentIdNum,
          },
        },
      });

      await prisma.comment.update({
        where: { id: commentIdNum },
        data: {
          upvoteCount: {
            decrement: 1,
          },
        },
      });

      return NextResponse.json({ message: "Upvote removed" });
    } else {
      // Add upvote
      await prisma.commentUpvote.create({
        data: {
          userId,
          commentId: commentIdNum,
        },
      });

      await prisma.comment.update({
        where: { id: commentIdNum },
        data: {
          upvoteCount: {
            increment: 1,
          },
        },
      });

      return NextResponse.json({ message: "Upvoted successfully" });
    }
  } catch (err) {
    console.error("Error toggling upvote:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
