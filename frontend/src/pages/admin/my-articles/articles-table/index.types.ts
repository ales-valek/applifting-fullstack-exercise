import { Article } from 'services/api/applifting-blog/openapi.types';
import { SORT_TYPE } from './constants';

export type ArticleTableUIProps = {
  className?: string;
  articles: Article[];
  onFilterClick: (type: SORT_TYPE) => void;
  onRefetchClick: () => void;
  isLoading?: boolean;
  isError?: boolean;
};
