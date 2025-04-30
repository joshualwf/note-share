import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";
import { uploadFileToS3, deleteFileFromS3 } from "@/lib/s3";

export async function POST(req: NextRequest) {
  const fileKeysToCleanUp: string[] = [];

  try {
    const user = await getUserFromCookie();
    if (!user) return new Response("Unauthorized", { status: 401 });

    const userId = Number(user.id);
    const formData = await req.formData();

    const files = formData.getAll("files") as File[];
    const metadata: Record<string, string>[] = [];

    // Extract metadata for each file based on the appended format
    let i = 0;
    while (formData.has(`metadata[${i}][courseName]`)) {
      metadata.push({
        school: formData.get(`metadata[${i}][school]`) as string,
        courseCode: formData.get(`metadata[${i}][courseCode]`) as string,
        courseName: formData.get(`metadata[${i}][courseName]`) as string,
        documentType: formData.get(`metadata[${i}][documentType]`) as string,
        description: formData.get(`metadata[${i}][description]`) as string,
        fileType: formData.get(`metadata[${i}][fileType]`) as string,
      });
      i++;
    }

    if (files.length !== metadata.length) {
      return NextResponse.json(
        { message: "File and metadata count mismatch." },
        { status: 400 }
      );
    }

    for (let j = 0; j < files.length; j++) {
      const file = files[j];
      const data = metadata[j];

      if (
        !data.description ||
        !data.school ||
        !data.courseName ||
        !data.documentType ||
        !data.fileType ||
        !file
      ) {
        console.log("Skipping file due to missing data", { index: j, data });
        continue;
      }

      const fileKey = await uploadFileToS3(file);
      if (!fileKey) {
        return NextResponse.json({ message: "File upload failed" }, { status: 500 });
      }

      fileKeysToCleanUp.push(fileKey);

      await prisma.post.create({
        data: {
          user: { connect: { id: userId } },
          description: data.description,
          schoolName: data.school,
          courseCode: data.courseCode,
          courseName: data.courseName,
          fileKey: fileKey,
          fileType: data.fileType,
          postType: data.documentType,
        },
      });
    }

    return NextResponse.json({ message: "All files uploaded successfully." });
  } catch (error) {
    console.error("Bulk upload error:", error);

    // Clean up all orphaned uploaded files
    await Promise.all(
      fileKeysToCleanUp.map(async (key) => {
        try {
          await deleteFileFromS3(key);
        } catch (err) {
          console.error("Failed to clean up S3 file:", err);
        }
      })
    );

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}