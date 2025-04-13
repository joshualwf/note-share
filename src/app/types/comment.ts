export type CommentType = {
  username: string;
  profilePicture?: string;
  createdAt: string;
  text: string;
  upvoteCount?: number;
  replies?: Comment[];
  isReply?: boolean;
};
