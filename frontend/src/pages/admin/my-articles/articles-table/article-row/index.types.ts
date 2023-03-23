import { Article } from 'services/api/applifting-blog/openapi.types';

export type ArticleRowUIProps = {
  article: Article;
  onDelete?: () => void;
  isDeleting?: boolean;
};
