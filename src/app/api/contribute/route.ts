import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getUserFromCookie } from "@/lib/auth";
import { uploadFileToS3 } from "@/lib/s3";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const school = formData.get("school") as string;
    const courseCode = formData.get("courseCode") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File;
    let fileKey: string | null = null;
    if (file && file.size > 0) {
      fileKey = await uploadFileToS3(file); // now returns the key
    }
    

    const resourceTypes = JSON.parse(
      formData.get("resourceTypes") as string
    ) as string[];

    if (!title || !school || !courseCode || (description.length == 0 && !fileKey) || resourceTypes.length === 0) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }


    // Get or create the course
    let courseId: string;
    const courseResult = await query(
      `SELECT id FROM courses WHERE school_name = $1 AND course_code = $2`,
      [school, courseCode]
    );

    if (courseResult.length > 0) {
      courseId = courseResult[0].id;
    } else {
      const insertCourse = await query(
        `INSERT INTO courses (school_name, course_code)
         VALUES ($1, $2) RETURNING id`,
        [school, courseCode]
      );
      courseId = insertCourse[0].id;
    }

    const user = await getUserFromCookie();
    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }
    const userId = user.id;

    await query(
      `INSERT INTO posts (user_id, school_name, course_code, title, description, file_key, post_type)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        userId,
        school,
        courseCode,
        title,
        description,
        fileKey || null,
        resourceTypes,
      ]
    );       

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.error("Contribute API error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
