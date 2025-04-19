"use client";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CommentSection from "./CommentSection";
import { useUser } from "@/app/UserContext";
function DesktopCommentSection({ postId }: { postId: number }) {
  const { isDesktop } = useUser();
  if (!isDesktop) return null;
  return (
    <>
      <ResizableHandle withHandle className="shadow-2xl" />
      <ResizablePanel
        defaultSize={25}
        minSize={20}
        className="h-full w-full flex flex-col"
      >
        <CommentSection postId={postId} />
      </ResizablePanel>
    </>
  );
}
export default DesktopCommentSection;
