import { Article } from 'services/api/applifting-blog/openapi.types';

export type BlogArticleProps = Required<
  Omit<Article, 'articleId' | 'createdAt' | 'lastUpdatedAt'>
> & {
  articleUrl: string;
  postDate: string;
};
