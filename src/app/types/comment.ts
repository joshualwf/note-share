export type CommentType = {
  commentId: number;
  username: string;
  profilePicture?: string;
  createdAt: string;
  text: string;
  upvoteCount?: number;
  replies?: Comment[];
  isReply?: boolean;
  hasLiked: boolean;
};
