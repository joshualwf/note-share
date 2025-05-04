"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CommentSection from "./CommentSection";
import { useUser } from "@/app/UserContext";
import { Button } from "./ui/button";
import { MessageSquareMore } from "lucide-react";

type Props = {
  children: React.ReactNode;
};
function MobileCommentSection({ postId }: { postId: number }) {
  const { isDesktop } = useUser();
  if (isDesktop) return null;
  return (
    <Sheet>
      <SheetTrigger className="p-3">
        <Button variant="default" className="w-full ">
          <MessageSquareMore />
          <span>Comments</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="grow flex flex-col h-[calc(100vh-80px)] min-h-0 overflow-auto"
      >
        <CommentSection postId={postId} />
      </SheetContent>
    </Sheet>
  );
}

export default MobileCommentSection;
