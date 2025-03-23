"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ThumbsUp, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { getRelativeTime } from "@/app/utils/utils";
import { CommentProps } from "@/app/types/comment";

function Comment({
  username,
  profilePic = "https://github.com/shadcn.png",
  time,
  text,
  likeCount = 0,
  replies = [],
  isReply = false,
}: CommentProps) {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="flex gap-2">
      <Avatar className={isReply ? "w-6 h-6" : "w-10 h-10"}>
        <AvatarImage src={profilePic} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start">
        <div className="flex flex-row gap-1">
          <span className="font-bold text-xs">@{username}</span>
          <span className="text-xs font-light">{getRelativeTime(time)}</span>
        </div>
        <span className="text-sm mt-1">{text}</span>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 items-center">
            <Button
              variant="ghost"
              className="px-1 py-0 border rounded-2xl border-transparent hover:bg-accent"
            >
              <ThumbsUp className="w-4 h-4" />
            </Button>
            {likeCount > 0 && <span className="text-xs">{likeCount}</span>}
          </div>
          <Button
            variant="ghost"
            className="px-1 py-0 border rounded-2xl border-transparent hover:bg-accent"
          >
            <span className="text-xs font-bold">Reply</span>
          </Button>
        </div>

        {replies.length > 0 && (
          <>
            <Button
              variant="ghost"
              onClick={() => setShowReplies(!showReplies)}
              className="flex px-2 py-0 items-center gap-1 border rounded-2xl border-transparent hover:bg-accent mt-[-9px]"
            >
              {showReplies ? (
                <ChevronUp className="w-4 h-4" color="#0b57d0" />
              ) : (
                <ChevronDown className="w-4 h-4" color="#0b57d0" />
              )}
              <span className="text-xs text-primary font-bold">
                {replies.length} repl{replies.length === 1 ? "y" : "ies"}
              </span>
            </Button>

            {showReplies && (
              <div className="mt-2 pl-4 border-l border-accent">
                {replies.map((reply, index) => (
                  <Comment key={index} {...reply} isReply />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Comment;
