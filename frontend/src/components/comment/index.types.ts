export type CommentProps = {
  author: string;
  postDate: string;
  content: string;
  score: number;
  onVoteUp: () => void;
  onVoteDown: () => void;
  isCountChanging?: boolean;
};
