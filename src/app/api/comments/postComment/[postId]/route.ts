import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { decrypt, getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = await params;
  const postIdNum = Number(postId);
  if (isNaN(postIdNum)) {
    return new Response("Invalid post ID", { status: 400 });
  }

  const body = await req.json();
  const { text, parentCommentId } = body;
  console.log("text", text);
  if (!text || typeof text !== "string") {
    console.log("hi");
    return new Response("Invalid comment text", { status: 400 });
  }

  // Get session cookie and decrypt user
  const user = await getUserFromCookie();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
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
      id: newComment.id,
      username: newComment.user.username ?? "Anonymous",
      profilePicture:
        newComment.user.profilePicture ?? "https://github.com/shadcn.png",
      createdAt: newComment.createdAt,
      text: newComment.commentText,
      upvoteCount: newComment.upvoteCount,
      isReply: !!parentCommentId,
      replies: [],
    });
  } catch (err) {
    console.error("Error creating comment:", err);
    return new Response("Server error", { status: 500 });
  }
}
