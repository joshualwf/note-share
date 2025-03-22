import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface DocumentCardProps {
  id: number;
  title: string;
  school: string;
  modCode: string;
  likes: number;
  uploadTime: Date;
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { unit: string; seconds: number }[] = [
    { unit: "y", seconds: 31536000 },
    { unit: "mo", seconds: 2592000 },
    { unit: "w", seconds: 604800 },
    { unit: "d", seconds: 86400 },
    { unit: "h", seconds: 3600 },
    { unit: "m", seconds: 60 },
  ];

  for (const { unit, seconds } of intervals) {
    const value = Math.floor(diffInSeconds / seconds);
    if (value >= 1) {
      return `Uploaded ${value}${unit} ago`;
    }
  }

  return "Uploaded just now";
}

export function DocumentCard({
  id,
  title,
  school,
  modCode,
  likes,
  uploadTime,
}: DocumentCardProps) {
  const formattedTime = getRelativeTime(uploadTime);

  return (
    <Link href={`/document/${id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {school} | {modCode}
          </CardDescription>
          <div className="flex flex-row flex-start text-muted-foreground text-sm gap-1 items-center">
            <div className="py-1 px-1 rounded-lg flex flex-row h-6 items-center gap-1">
              <Image src="/like.svg" alt="Like icon" width={16} height={16} />
              <div>{likes}</div>
            </div>
            <div className="py-1 px-1">{formattedTime}</div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
