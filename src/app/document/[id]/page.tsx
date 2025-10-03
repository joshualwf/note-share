"use client";
import React, { useEffect, useState } from "react";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import DocumentViewer from "@/components/DocumentViewer";
import PostUpvote from "@/components/PostUpvote";
// import {
//   BookOpen,
//   Clock,
//   GraduationCap,
//   School,
//   ThumbsDown,
// } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Head from "next/head";
import DesktopCommentSection from "@/components/DesktopCommentSection";
import MobileCommentSection from "@/components/MobileCommentSection";
import ContributePrompt from "@/components/ContributePrompt";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ title?: string; fileKey?: string }>;

function DocumentPage(props: { params: Params; searchParams: SearchParams }) {
  const [post, setPost] = useState<any>(null);
  const [postId, setPostId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { id } = await props.params;
      const postIdNum = Number(id);
      setPostId(postIdNum);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/getPostDetails/${id}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to load post data");
      }

      const postData = await res.json();
      setPost(postData);
    };

    fetchData();
  }, [props.params]);

  useEffect(() => {
    if (!postId) return;

    const incrementViewCount = async () => {
      try {
        await fetch("/api/posts/incrementViewCount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId }),
        });
      } catch (error) {
        console.error("Failed to increment view count:", error);
      }
    };

    incrementViewCount();
  }, [postId]);

  if (!post || !postId) {
    return null;
  }

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
          content={`Access ${description}, ${courseCode}, ${courseName} at ${schoolName}. Lecture notes/past year exam papers (PYP)/practice`}
          key="desc"
        />
        <meta property="og:title" content={description} />
        <meta
          property="og:description"
          content={`Access ${description}, ${courseCode}, ${courseName} at ${schoolName}. Lecture notes/past year exam papers (PYP)/practice`}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/icon9.png`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
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
                postId={postId}
                initialUpvoteCount={Number(upvoteCount)}
              />
            </div>
          </div>
          <DocumentViewer postId={postId.toString()} />
        </ResizablePanel>
        <DesktopCommentSection postId={postId} />
      </ResizablePanelGroup>
      <MobileCommentSection postId={postId} />
    </>
  );
}

export default DocumentPage;
