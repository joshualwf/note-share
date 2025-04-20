"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MessagesSquare, SendHorizontal } from "lucide-react";
import Comment from "@/components/Comment";
import { CommentType } from "@/app/types/comment";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "./LoadingSpinner";

function CommentSection({ postId }: { postId: number }) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [error, setError] = useState("");
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();
  async function fetchComments() {
    setLoading(true);
    try {
      const res = await fetch(`/api/comments/getComments/${postId}`);
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to load comments",
      });
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchComments();
  }, []);

  const handlePostComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await fetch(`/api/comments/postComment/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: commentText.trim(),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast({
          title: errorData.message || "Failed to post comment",
        });
        return;
      }

      toast({
        title: "Comment added! 💬",
      });
      setCommentText(""); // Clear the input
      fetchComments();
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong while posting",
      });
    }
  };

  return (
    <>
      <div className="flex flex-start p-3 border-b border-color-accent min-h-[50px]">
        <span className="font-semibold">Comments</span>
      </div>
      <div className="flex flex-col grow w-full pb-6 justify-between overflow-hidden">
        <div
          className={`flex flex-col w-full overflow-y-auto px-4 pt-4 gap-2 scroll-transparent`}
        >
          {loading && comments.length === 0 ? (
            <div className="flex justify-center pt-4">
              <LoadingSpinner />
            </div>
          ) : comments.length === 0 ? (
            <div className="flex flex-col items-center pt-4 text-center justify-center">
              <MessagesSquare size={64} />
              <span className="mt-1">Psst.. No comments yet</span>
              <span className="text-muted-foreground mt-1">
                Be the first to ask a question or share your thoughts 🤓
              </span>
            </div>
          ) : (
            comments.map((comment, index) => (
              <Comment
                key={index}
                {...comment}
                topLevelCommentId={comment.commentId}
                postId={postId}
                fetchComments={fetchComments}
              />
            ))
          )}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePostComment();
          }}
          className="flex gap-2 border border-color-accent rounded-2xl p-4 shadow-lg mx-4"
        >
          <Input
            className="grow"
            placeholder="Ask anything"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></Input>
          <Button type="submit">
            <SendHorizontal />
          </Button>
        </form>
      </div>
    </>
  );
}

export default CommentSection;
