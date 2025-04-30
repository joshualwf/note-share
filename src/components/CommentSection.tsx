"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/UserContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MessagesSquare, SendHorizontal } from "lucide-react";
import Comment from "@/components/Comment";
import { CommentType } from "@/app/types/comment";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "./LoadingSpinner";

function CommentSection({ postId }: { postId: number }) {
  const { user } = useUser();
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

    const tempId = Date.now();
    const tempComment: CommentType = {
      commentId: tempId,
      username: "You",
      profilePicture: user?.profilePicture ?? undefined,
      createdAt: new Date().toISOString(),
      text: commentText.trim(),
      upvoteCount: 0,
      hasLiked: false,
      isOwnComment: true,
      replies: [],
      isReply: false,
    };

    setComments((prev) => [tempComment, ...prev]);
    setCommentText("");

    try {
      const res = await fetch(`/api/comments/postComment/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: tempComment.text }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setComments((prev) => prev.filter((c) => c.commentId !== tempId));
        toast({ title: errorData.message });
        return;
      }

      const savedComment: CommentType = await res.json();

      // Replace optimistic comment with saved comment
      setComments((prev) =>
        prev.map((c) => (c.commentId === tempId ? savedComment : c))
      );

      toast({ title: "Comment added! 💬" });
    } catch (err) {
      // Remove optimistic comment on failure
      setComments((prev) => prev.filter((c) => c.commentId !== tempId));
      console.error(err);
      toast({ title: "Something went wrong while posting" });
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    const prevComments = [...comments];
    setComments((prev) => prev.filter((c) => c.commentId !== commentId));

    try {
      const res = await fetch(`/api/comments/deleteComment/${commentId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(
          (await res.json()).message || "Failed to delete comment"
        );
      }

      toast({ title: "Comment deleted 🗑️" });
    } catch (err: any) {
      setComments(prevComments); // rollback if error
      toast({ title: err.message || "Something went wrong. Try again." });
    }
  };

  const handleDeleteReply = (replyId: number, parentCommentId: number) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.commentId !== parentCommentId) return comment;
        return {
          ...comment,
          replies: comment.replies?.filter((r) => r.commentId !== replyId),
        };
      })
    );
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
                key={comment.commentId}
                {...comment}
                topLevelCommentId={comment.commentId}
                postId={postId}
                fetchComments={fetchComments}
                handleDeleteComment={handleDeleteComment}
                handleDeleteReply={handleDeleteReply}
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
