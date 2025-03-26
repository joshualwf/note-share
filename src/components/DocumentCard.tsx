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

interface DocumentCardProps {
  id: string;
  title: string;
  school: string;
  modCode: string;
  likes: number;
  uploadTime: Date;
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
