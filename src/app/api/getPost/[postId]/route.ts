import { NextRequest } from "next/server";
import { s3 } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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
    const post = await prisma.post.findUnique({
      where: { id: postIdNum },
      select: {
        fileKey: true,
        fileType: true,
      },
    });

    if (!post || !post.fileKey) {
      return new Response("File not found", { status: 404 });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: post.fileKey,
    });

    const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

    return Response.json({
      url: presignedUrl,
      fileType: post.fileType,
    });
  } catch (err) {
    console.error("Failed to generate presigned URL:", err);
    return new Response("Server error", { status: 500 });
  }
}
