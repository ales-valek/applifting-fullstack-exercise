import { Article } from 'services/api/applifting-blog/openapi.types';
import { SORT_TYPE } from './constants';

export const getSortedArticles = (
  articles: Article[],
  type: SORT_TYPE | null
) => {
  switch (type) {
    case SORT_TYPE.ID:
      return articles?.sort((a, b) =>
        (a?.articleId ?? '').localeCompare(b?.articleId ?? '')
      );
    case SORT_TYPE.TIME:
      return articles?.sort(
        (a, b) =>
          new Date(b?.lastUpdatedAt ?? '').getTime() -
          new Date(a?.lastUpdatedAt ?? '').getTime()
      );
    case SORT_TYPE.ARTICLE_TITLE:
      return articles?.sort((a, b) =>
        (a?.title ?? '').localeCompare(b?.title ?? '')
      );
    case SORT_TYPE.PEREX:
      return articles?.sort((a, b) =>
        (a?.perex?.split(' ')[0] ?? '').localeCompare(
          b?.perex?.split(' ')[0] ?? ''
        )
      );
    default:
      return articles;
  }
};
