"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PostUpvoteProps = {
  postId: number;
  initialUpvoteCount: number;
};

function PostUpvote({ postId, initialUpvoteCount }: PostUpvoteProps) {
  const [upvoteCount, setUpvoteCount] = useState(initialUpvoteCount);
  const { toast } = useToast();

  const handleToggleUpvote = async () => {
    try {
      const res = await fetch(`/api/posts/postUpvote/${postId}`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: data.message || "Something went wrong.",
        });
        return;
      }

      if (data.message === "Like added successfully") {
        setUpvoteCount((prev: number) => prev + 1);
      } else if (data.message === "Like removed") {
        setUpvoteCount((prev: number) => Math.max(0, prev - 1));
      }

      toast({ title: data.message });
    } catch (err) {
      console.error("Upvote error:", err);
      toast({ title: "Unexpected error. Try again later." });
    }
  };
  return (
    <div className="flex gap-1 items-center">
      <Button
        variant="ghost"
        className="px-1 py-0 border rounded-2xl border-transparent hover:bg-muted-foreground"
        onClick={handleToggleUpvote}
      >
        <ThumbsUp className="w-4 h-4" />
      </Button>
      {upvoteCount > 0 && <span className="text-xs">{upvoteCount}</span>}
    </div>
  );
}

export default PostUpvote;
