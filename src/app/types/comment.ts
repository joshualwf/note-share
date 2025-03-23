export interface CommentProps {
  username: string;
  profilePic?: string;
  time: Date;
  text: string;
  likeCount?: number;
  replies?: CommentProps[];
  isReply?: boolean;
}
