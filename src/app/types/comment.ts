export type CommentType = {
  commentId: number;
  username: string;
  profilePicture?: string;
  createdAt: string;
  text: string;
  upvoteCount?: number;
  replies?: CommentType[];
  isReply?: boolean;
  hasLiked: boolean;
  isOwnComment: boolean;
};
