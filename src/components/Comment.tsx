"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ThumbsUp, ChevronDown, ChevronUp, SendHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { getRelativeTime } from "@/app/utils/utils";
import { CommentType } from "@/app/types/comment";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

type Props = CommentType & {
  postId: number;
  topLevelCommentId: number;
  fetchComments: () => void;
};

function Comment({
  commentId,
  username,
  profilePicture = "https://github.com/shadcn.png",
  createdAt,
  text,
  upvoteCount = 0,
  replies = [],
  isReply = false,
  postId,
  topLevelCommentId,
  fetchComments,
}: Props) {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState(`@${username} `);

  const { toast } = useToast();

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;
    try {
      const res = await fetch(`/api/comments/postComment/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: replyText.trim(),
          parentCommentId: topLevelCommentId,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        const result = await res.json();
        toast({
          title: result.message || "Failed to post reply",
        });
        return;
      }
      setReplyText(`@${username} `);
      setShowReplyInput(false);
      toast({
        title: "Reply sent! 💬",
      });
      fetchComments();
    } catch (err) {
      console.error("Error posting reply:", err);
    }
  };

  const handleToggleUpvote = async () => {
    try {
      const res = await fetch(`/api/comments/postCommentUpvote/${commentId}`, {
        method: "POST",
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) {
        toast({ title: result.message || "Failed to toggle upvote" });
        return;
      }
      fetchComments(); // refresh the comment list
    } catch (err) {
      console.error("Error toggling upvote:", err);
      toast({ title: "Something went wrong while upvoting" });
    }
  };

  return (
    <div className="flex gap-2">
      <Avatar className={isReply ? "w-6 h-6" : "w-10 h-10"}>
        <AvatarImage src={profilePicture} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start">
        <div className="flex flex-row gap-1">
          <span className="font-bold text-xs">@{username}</span>
          <span className="text-xs font-light">
            {getRelativeTime(createdAt)}
          </span>
        </div>
        <span className="text-sm mt-1 break-all">{text}</span>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 items-center">
            <Button
              variant="ghost"
              className="px-1 py-0 border rounded-2xl border-transparent hover:bg-accent"
              onClick={handleToggleUpvote}
            >
              <ThumbsUp className="w-4 h-4" />
            </Button>
            {upvoteCount > 0 && <span className="text-xs">{upvoteCount}</span>}
          </div>
          <Button
            variant="ghost"
            className="px-1 py-0 border rounded-2xl border-transparent hover:bg-accent"
            onClick={() => setShowReplyInput((prev) => !prev)}
          >
            <span className="text-xs font-bold">Reply</span>
          </Button>
        </div>
        {showReplyInput && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleReplySubmit();
            }}
            className="flex gap-2 mb-3 items-center mt-1"
          >
            <Input
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <Button type="submit">
              <SendHorizontal />
            </Button>
          </form>
        )}

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
                  <Comment
                    key={index}
                    {...(reply as unknown as CommentType)}
                    isReply
                    postId={postId}
                    topLevelCommentId={topLevelCommentId}
                    fetchComments={fetchComments}
                  />
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
