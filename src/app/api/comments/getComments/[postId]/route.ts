import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
): Promise<Response> {
  const { postId } = await params;
  const postIdNum = Number(postId);

  if (isNaN(postIdNum)) {
    return new Response("Invalid post ID", { status: 400 });
  }

  const user = await getUserFromCookie();
  if (!user) {
    return NextResponse.json(
      { message: "Error fetching user information" },
      { status: 401 }
    );
  }

  const userId = Number(user.id);

  try {
    const topLevelComments = await prisma.comment.findMany({
      where: {
        postId: postIdNum,
        parentCommentId: null,
      },
      include: {
        user: true,
        upvotes: {
          where: { userId }, 
        },
        childComments: {
          include: {
            user: true,
            upvotes: {
              where: { userId },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
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
      hasLiked: comment.upvotes.length > 0, // upvote status
      replies: comment.childComments.map((reply) => ({
        commentId: reply.id,
        username: reply.user.username,
        profilePicture: reply.user.profilePicture,
        createdAt: reply.createdAt,
        text: reply.commentText,
        upvoteCount: reply.upvoteCount,
        isReply: true,
        hasLiked: reply.upvotes.length > 0, // upvote status
        replies: [], // For now, only supporting 1 level of nesting
      })),
    }));

    return Response.json(formatted);
  } catch (err) {
    console.error("Error fetching comments:", err);
    return new Response("Server error", { status: 500 });
  }
}
