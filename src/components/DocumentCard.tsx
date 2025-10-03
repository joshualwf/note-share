import { getRelativeTime } from "@/app/utils/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Eye, ThumbsUp } from "lucide-react";

interface DocumentCardProps {
  id: number;
  title: string;
  school: string;
  courseCode: string;
  courseName: string;
  likes: number;
  views: number;
  fileKey: string;
  uploadTime: Date;
}

export function DocumentCard({
  id,
  title,
  school,
  courseCode,
  courseName,
  likes,
  views,
  fileKey,
  uploadTime,
}: DocumentCardProps) {
  const formattedTime = getRelativeTime(uploadTime);

  return (
    <Link
      href={{
        pathname: `/document/${id}`,
        query: {
          title,
        },
      }}
    >
      <Card className="fade-in">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {school} |{" "}
            {courseCode && courseName
              ? `${courseCode} - ${courseName}`
              : courseCode || courseName}
          </CardDescription>
          <div className="flex flex-row flex-start text-muted-foreground text-sm gap-1 items-center">
            <div className="py-1 px-1 rounded-lg flex flex-row h-6 items-center gap-1">
              <Image src="/like.svg" alt="Like icon" width={16} height={16} />
              <div>{likes}</div>
            </div>
            <div className="py-1 px-1 rounded-lg flex flex-row h-6 items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{views}</span>
            </div>
            <div className="py-1 px-1">{formattedTime}</div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
