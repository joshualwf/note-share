// app/api/presign/route.ts
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest } from "next/server";
import { s3 } from "@/lib/s3"; 

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");

  if (!key) {
    return new Response("Missing S3 key", { status: 400 });
  }

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
  });

  try {
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return Response.json({ url });
  } catch (err) {
    console.error("Error generating presigned URL", err);
    return new Response("Error", { status: 500 });
  }
}
