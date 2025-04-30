import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { decrypt, getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
): Promise<Response> {
  const { postId } = await params;
  const postIdNum = Number(postId);
  if (isNaN(postIdNum)) {
    return NextResponse.json({ message: "Invalid post id" }, { status: 400 });
  }

  const body = await req.json();
  const { text, parentCommentId } = body;
  if (!text || typeof text !== "string") {
    return NextResponse.json(
      { message: "Invalid comment text." },
      { status: 400 }
    );
  }

  // Get session cookie and decrypt user
  const user = await getUserFromCookie();
  if (!user) {
    return NextResponse.json(
      { message: "Please login to comment." },
      { status: 401 }
    );
  }

  const userId = Number(user.id);

  try {
    const newComment = await prisma.comment.create({
      data: {
        userId: userId,
        postId: postIdNum,
        commentText: text,
        parentCommentId: parentCommentId ?? null,
      },
      include: {
        user: true,
      },
    });

    return Response.json({
      commentId: newComment.id,
      username: newComment.user.username ?? "Anonymous",
      profilePicture:
        newComment.user.profilePicture ?? "https://github.com/shadcn.png",
      createdAt: newComment.createdAt,
      text: newComment.commentText,
      upvoteCount: newComment.upvoteCount,
      isOwnComment: true,
      isReply: !!parentCommentId,
      replies: [],
    });
  } catch (err) {
    console.error("Error creating comment:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
