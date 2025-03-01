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
  uploadTime: string;
}

export function DocumentCard({
  title,
  description,
  likes,
  uploadTime,
}: DocumentCardProps) {
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
          <div className="py-1 px-1 ">{uploadTime}</div>
        </div>
      </CardHeader>
    </Card>
  );
}
