import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
): Promise<Response> {
  const { postId } = await params;
  const postIdNum = Number(postId);

  if (isNaN(postIdNum)) {
    return new Response("Invalid post ID", { status: 400 });
  }

  try {
    const topLevelComments = await prisma.comment.findMany({
      where: {
        postId: postIdNum,
        parentCommentId: null, // Only top-level comments
      },
      include: {
        user: true,
        childComments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const formatted = topLevelComments.map((comment) => ({
      commentId: comment.id,
      username: comment.user.username,
      profilePicture: comment.user.profilePicture,
      createdAt: comment.createdAt,
      text: comment.commentText,
      upvoteCount: comment.upvoteCount,
      isReply: false,
      replies: comment.childComments.map((reply) => ({
        commentId: reply.id,
        username: reply.user.username,
        profilePicture: reply.user.profilePicture,
        createdAt: reply.createdAt,
        text: reply.commentText,
        upvoteCount: reply.upvoteCount,
        isReply: true,
        replies: [], // For now, only supporting 1 level of nesting
      })),
    }));

    return Response.json(formatted);
  } catch (err) {
    console.error("Error fetching comments:", err);
    return new Response("Server error", { status: 500 });
  }
}
