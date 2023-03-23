import { useParams } from 'react-router-dom';

import { BlogApiHooks } from 'services/api/applifting-blog';

import Comment from 'components/comment';

const Comments = ({ className }: { className?: string }) => {
  const { articleId } = useParams();
  const { data, isError, isLoading } = BlogApiHooks.articles.useGet({
    articleId: articleId!,
  });

  const onVoteUp = () => {};
  const onVoteDown = () => {};

  if (isLoading || isError) {
    return <></>;
  }

  return (
    <div className={className}>
      {data?.comments?.length !== 0 && (
        <>
          <h3>{`Comments (${data?.comments?.length})`}</h3>
          {data?.comments?.map(({ author, content, postedAt, score }) => (
            <Comment
              author={author}
              content={content}
              postDate={postedAt ?? ''}
              score={score ?? 0}
              onVoteUp={onVoteUp}
              onVoteDown={onVoteDown}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Comments;
