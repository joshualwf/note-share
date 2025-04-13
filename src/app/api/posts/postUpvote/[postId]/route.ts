import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = await params;
  const postIdNum = Number(postId);

  if (!postId || isNaN(postIdNum)) {
    return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
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
    const existingUpvote = await prisma.postUpvote.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: postIdNum,
        },
      },
    });

    if (existingUpvote) {
      // Remove the upvote
      await prisma.postUpvote.delete({
        where: {
          userId_postId: {
            userId,
            postId: postIdNum,
          },
        },
      });

      await prisma.post.update({
        where: { id: postIdNum },
        data: {
          upvoteCount: {
            decrement: 1,
          },
        },
      });

      return NextResponse.json({ message: "Like removed" });
    } else {
      // Add upvote
      await prisma.postUpvote.create({
        data: {
          userId,
          postId: postIdNum,
        },
      });

      await prisma.post.update({
        where: { id: postIdNum },
        data: {
          upvoteCount: {
            increment: 1,
          },
        },
      });

      return NextResponse.json({ message: "Like added successfully" });
    }
  } catch (err) {
    console.error("Error toggling post upvote:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
