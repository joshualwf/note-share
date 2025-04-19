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
import Head from "next/head";
import DesktopCommentSection from "@/components/DesktopCommentSection";
import MobileCommentSection from "@/components/MobileCommentSection";
import ContributePrompt from "@/components/ContributePrompt";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ title?: string; fileKey?: string }>;

async function DocumentPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { title } = await props.searchParams;
  const { id } = await props.params;
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
    <>
      <Head>
        <title>{description}</title>
        <meta
          name="description"
          content={`${description}, ${schoolName}, ${courseName}, ${courseCode}`}
          key="desc"
        />
        <meta property="og:title" content={description} />
        <meta
          property="og:description"
          content={`${description}, ${schoolName}, ${courseName}, ${courseCode}`}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/icon9.png`}
        />
      </Head>
      <ContributePrompt />
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        <ResizablePanel
          defaultSize={75}
          className={`h-full w-full !overflow-auto scroll-transparent`}
        >
          <div className="flex flex-start p-3 border-b border-color-accent min-h-[50px] bg-accent items-center justify-between">
            <span className="font-semibold break-all mr-2">{description}</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={profilePicture} />
                </Avatar>
                <span className="font-bold">@{username}</span>
              </div>

              {/* do not remove this for now */}
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

              <PostUpvote
                postId={postIdNum}
                initialUpvoteCount={Number(upvoteCount)}
              />
            </div>
          </div>
          <DocumentViewer postId={id} />
        </ResizablePanel>
        <DesktopCommentSection postId={postIdNum} />
      </ResizablePanelGroup>
      <MobileCommentSection postId={postIdNum} />
    </>
  );
}

export default DocumentPage;
