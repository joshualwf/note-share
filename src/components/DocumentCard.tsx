import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface DocumentCardProps {
  title: string;
  description: string;
  likes: number;
  uploadTime: Date;
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { unit: string; seconds: number }[] = [
    { unit: "y", seconds: 31536000 }, // 1 year = 365 days
    { unit: "mo", seconds: 2592000 }, // 1 month = 30 days
    { unit: "w", seconds: 604800 }, // 1 week = 7 days
    { unit: "d", seconds: 86400 }, // 1 day
    { unit: "h", seconds: 3600 }, // 1 hour
    { unit: "m", seconds: 60 }, // 1 minute
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
  title,
  description,
  likes,
  uploadTime,
}: DocumentCardProps) {
  const formattedTime = getRelativeTime(uploadTime);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-primary">
          {description}
        </CardDescription>
        <div className="flex flex-row flex-start text-muted-foreground text-sm gap-1 items-center">
          <div className="bg-accent py-1 px-1 rounded-lg flex flex-row h-6 items-center gap-1">
            <Image src="/like.svg" alt="Like icon" width={16} height={16} />
            <div>{likes}</div>
          </div>
          <div className="py-1 px-1 ">{formattedTime}</div>
        </div>
      </CardHeader>
    </Card>
  );
}
