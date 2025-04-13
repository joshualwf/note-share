import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import DocumentViewer from "@/components/DocumentViewer";
import CommentSection from "@/components/CommentSection";
import PostUpvote from "@/components/PostUpvote";
import {
  BookOpen,
  Clock,
  GraduationCap,
  School,
  ThumbsDown,
} from "lucide-react";
import { getRelativeTime } from "@/app/utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  params: { id: string };
  searchParams: { title?: string; fileKey?: string };
};

async function DocumentPage({ params, searchParams }: Props) {
  const { title } = await searchParams;
  const { id } = await params;
  const postIdNum = Number(id);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/getPostDetails/${id}`,
    {
      method: "GET",
      cache: "no-store", // ensures SSR freshness
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load post data");
  }

  const post = await res.json();
  const {
    description,
    schoolName,
    courseCode,
    courseName,
    upvoteCount,
    createdAt,
    user,
  } = post;
  const { username, profilePicture } = user;
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      <ResizablePanel
        defaultSize={75}
        className={`h-full w-full !overflow-auto scroll-transparent`}
      >
        <div className="flex flex-start p-3 border-b border-color-accent min-h-[50px] bg-accent items-center justify-between">
          <span className="font-semibold">{description}</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Avatar className="w-10 h-10">
                <AvatarImage src={profilePicture} />
              </Avatar>
              <span className="font-bold">@{username}</span>
            </div>
            {/* <div className="flex items-center gap-1">
              <School className="w-4 h-4" />
              <span>{schoolName}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>
                {courseName} - {courseCode}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{getRelativeTime(createdAt)}</span>
            </div> */}

            <PostUpvote postId={postIdNum} initialUpvoteCount={5} />
          </div>
        </div>
        <DocumentViewer postId={id} />
      </ResizablePanel>
      <ResizableHandle withHandle className="shadow-2xl" />
      <ResizablePanel
        defaultSize={25}
        minSize={20}
        className="h-full w-full flex flex-col"
      >
        <CommentSection postId={postIdNum} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default DocumentPage;
