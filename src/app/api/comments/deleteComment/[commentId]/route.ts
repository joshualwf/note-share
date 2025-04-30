import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
): Promise<Response> {
  const { commentId } = await params;
  const commentIdNum = Number(commentId);

  if (isNaN(commentIdNum)) {
    return NextResponse.json({ message: "Invalid comment ID" }, { status: 400 });
  }

  const user = await getUserFromCookie();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = Number(user.id);
  const userAdmin = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      admin: true,
    },
  });
  if (!userAdmin) {
    return NextResponse.json({ message: "Invalid user." }, { status: 401 });
  }

  try {
    const comment = await prisma.comment.findUnique({
        where: { id: commentIdNum },
        include: {
          childComments: true,
          upvotes: true,
        },
    });

    if (!comment) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 });
    }

    const isOwnComment = comment.userId === userId;
    const isAdmin = userAdmin?.admin === 1;

    if (!isOwnComment && !isAdmin) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // 1. Delete upvotes on all child comments
    const childCommentIds = comment.childComments.map((child) => child.id);
    await prisma.$transaction([
        // Delete upvotes for all child comments
        prisma.commentUpvote.deleteMany({
          where: {
            commentId: { in: childCommentIds },
          },
        }),
  
        // Delete child comments
        prisma.comment.deleteMany({
          where: {
            id: { in: childCommentIds },
          },
        }),
  
        // Delete upvotes for the main comment
        prisma.commentUpvote.deleteMany({
          where: {
            commentId: commentIdNum,
          },
        }),
  
        // Delete the main comment
        prisma.comment.delete({
          where: {
            id: commentIdNum,
          },
        }),
      ]);

    return NextResponse.json({ message: "Comment and all associated data deleted." });
  } catch (err) {
    console.error("Error deleting comment:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
