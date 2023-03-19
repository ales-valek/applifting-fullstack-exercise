import { useParams } from 'react-router-dom';
import { BlogApiHooks } from 'services/api/applifting-blog';

const Comments = ({ className }: { className?: string }) => {
  const { articleId } = useParams();
  const { data, isLoading, isError } = BlogApiHooks.articles.useGet({
    articleId: articleId!,
  });
  return (
    <div className={className}>
      {data?.comments?.map((comment) => (
        <div></div>
      ))}
    </div>
  );
};

export default Comments;
