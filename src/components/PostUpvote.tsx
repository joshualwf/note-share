"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PostUpvoteProps = {
  postId: number;
  initialUpvoteCount: number;
};

function PostUpvote({ postId, initialUpvoteCount }: PostUpvoteProps) {
  const [upvoteCount, setUpvoteCount] = useState(initialUpvoteCount);
  const [hasLiked, setHasLiked] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLikedStatus = async () => {
      try {
        const res = await fetch(`/api/posts/postUpvote/${postId}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.hasLiked !== undefined) {
          setHasLiked(data.hasLiked);
        }
        console.log(res);
      } catch (err) {
        console.error("Failed to fetch like status:", err);
      }
    };

    fetchLikedStatus();
  }, [postId]);

  const handleToggleUpvote = async () => {
    const optimisticChange = hasLiked ? -1 : 1;

    setHasLiked((prev) => !prev);
    setUpvoteCount((prev) => Math.max(0, prev + optimisticChange));

    try {
      const res = await fetch(`/api/posts/postUpvote/${postId}`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }
    } catch (err: any) {
      // Revert changes if error
      setHasLiked((prev) => !prev);
      setUpvoteCount((prev) => Math.max(0, prev - optimisticChange));
      toast({ title: err?.message || "Failed to update like. Try again." });
    }
  };

  return (
    <div className="flex gap-1 items-center">
      <Button variant="outline" onClick={handleToggleUpvote}>
        <ThumbsUp
          className="w-4 h-4"
          strokeWidth={hasLiked ? 2.5 : 1.5}
          color={hasLiked ? "#0b57d0" : "#000000"}
        />
        {upvoteCount > 0 && <span className="text-xs">{upvoteCount}</span>}
      </Button>
    </div>
  );
}

export default PostUpvote;
