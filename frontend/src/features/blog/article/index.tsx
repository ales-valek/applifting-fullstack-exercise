import Article from 'components/article';
import { BlogApiHooks } from 'services/api/applifting-blog';
import { BlogArticleProps } from './index.types';

const BlogArticle = ({ imageId, ...props }: BlogArticleProps) => {
  const { data } = BlogApiHooks.images.useGet({ imageId: imageId! });

  return <Article imageUrl={data?.imageUrl ?? '#'} {...props} />;
};

export default BlogArticle;
