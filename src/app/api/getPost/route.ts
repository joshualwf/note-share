import { NextRequest } from "next/server";
import { s3 } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function GET(req: NextRequest) {
  const fileKey = req.nextUrl.searchParams.get("fileKey");

  if (!fileKey) {
    return new Response("Missing fileKey", { status: 400 });
  }

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileKey,
    });

    const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

    const s3Res = await fetch(presignedUrl);

    const contentType =
      s3Res.headers.get("Content-Type") || "application/octet-stream";

    return new Response(s3Res.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${fileKey.split("/").pop()}"`,
      },
    });
  } catch (err) {
    console.error("Failed to serve file:", err);
    return new Response("Server error", { status: 500 });
  }
}
