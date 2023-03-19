type CommentProps = {
  author: string;
  content: string;
  votes: number;
};

const Comment = ({ author, content, votes }: CommentProps) => {
  return (
    <div>
      <div>{author}</div>
      <div>{content}</div>
      <div>
        <div>{votes}</div>
        <button>+</button>
        <button>-</button>
      </div>
    </div>
  );
};

export default Comment;
