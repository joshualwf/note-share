import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
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
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const formatted = topLevelComments.map((comment) => ({
      username: comment.user.username ?? "Anonymous",
      profilePicture:
        comment.user.profilePicture ?? "https://github.com/shadcn.png",
      createdAt: comment.createdAt,
      text: comment.commentText,
      upvoteCount: comment.upvoteCount,
      isReply: false,
      replies: comment.childComments.map((reply) => ({
        username: reply.user.username ?? "Anonymous",
        profilePicture:
          reply.user.profilePicture ?? "https://github.com/shadcn.png",
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
