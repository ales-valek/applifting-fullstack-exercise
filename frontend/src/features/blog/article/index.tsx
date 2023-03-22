import Article from 'components/article';
import { BlogApiHooks } from 'services/api/applifting-blog';
import { Article as ArticleModel } from 'services/api/applifting-blog/openapi.types';

const BlogArticle = ({
  imageId,
  ...props
}: Required<Omit<ArticleModel, 'articleId' | 'createdAt' | 'lastUpdatedAt'>> & {
  articleUrl: string;
  postDate: string;
}) => {
  const { data } = BlogApiHooks.images.useGet({ imageId: imageId! });

  return <Article imageUrl={data?.imageUrl ?? '#'} {...props} />;
};

export default BlogArticle;
