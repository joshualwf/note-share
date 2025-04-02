import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";
import { uploadFileToS3, deleteFileFromS3 } from "@/lib/s3";

export async function POST(req: NextRequest) {
  let fileKey: string | null = null;

  try {
    const user = await getUserFromCookie();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = Number(user.id);
    const formData = await req.formData();

    const school = formData.get("school") as string;
    const courseCode = formData.get("courseCode") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File;
    const resourceTypes = formData.get("resourceTypes") as string;

    if (
      !description ||
      !school ||
      !courseCode ||
      !resourceTypes ||
      !file ||
      file.size === 0
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Upload file to S3
    fileKey = await uploadFileToS3(file);
    if (!fileKey) {
      return NextResponse.json({ message: "File upload failed" }, { status: 500 });
    }

    // Get or create course
    await prisma.course.upsert({
      where: {
        schoolName_courseCode: {
          schoolName: school,
          courseCode: courseCode,
        },
      },
      update: {},
      create: {
        schoolName: school,
        courseCode: courseCode,
      },
    });

    // Create the post
    await prisma.post.create({
      data: {
        user: { connect: { id: userId } },
        description,
        schoolName: school,
        courseCode: courseCode,
        fileKey: fileKey,
        postType: JSON.parse(resourceTypes), // assuming it's sent as a JSON string array
      },
    });

    return NextResponse.json({ message: "Success" });

  } catch (error) {
    console.error("Contribute API error:", error);

    // Clean up orphaned file if DB fails after upload
    if (fileKey) {
      try {
        await deleteFileFromS3(fileKey);
        console.log(`Deleted orphaned file: ${fileKey}`);
      } catch (deleteError) {
        console.error("Failed to delete orphaned S3 file:", deleteError);
      }
    }

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
