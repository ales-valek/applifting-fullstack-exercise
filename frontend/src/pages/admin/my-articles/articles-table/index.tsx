import { useState, useMemo } from 'react';

import { BlogApiHooks } from 'services/api/applifting-blog';
import { Article } from 'services/api/applifting-blog/openapi.types';

import styles from './index.module.scss';
import ArticleRow from './article-row';

enum SORT_TYPE {
  ID = 'ID',
  TIME = 'TIME',
  ARTICLE_TITLE = 'ARTICLE_TITLE',
  PEREX = 'PEREX',
}

enum SORT_ORDER {
  ASCENDING = 'ASCENDING',
  DESCENDING = 'DESCENDING',
}

const getSortedArticles = (articles: Article[], type: SORT_TYPE | null) => {
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
        (a?.title?.split(' ')[0] ?? '').localeCompare(
          b?.title?.split(' ')[0] ?? ''
        )
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

const ArticlesTable = () => {
  const { data, isLoading, isError, isSuccess } =
    BlogApiHooks.articles.useGetAll();

  const [sortBy, setSortBy] = useState<SORT_TYPE>(SORT_TYPE.TIME);
  const [sortOrder, setSortOrder] = useState<SORT_ORDER>(SORT_ORDER.DESCENDING);

  const articles = useMemo(() => {
    if (!isSuccess) return [];
    const articles = getSortedArticles(data?.items ?? [], sortBy);
    if (sortOrder === SORT_ORDER.DESCENDING) return articles;
    return articles?.reverse();
  }, [data?.items, isSuccess, sortBy, sortOrder]);

  const changeSorting = (sortType: SORT_TYPE) => {
    setSortBy(sortType);
    if (sortBy === sortType) {
      if (sortOrder === SORT_ORDER.DESCENDING) {
        setSortOrder(SORT_ORDER.ASCENDING);
      } else {
        setSortOrder(SORT_ORDER.DESCENDING);
      }
    } else {
      setSortOrder(SORT_ORDER.DESCENDING);
    }
  };

  return (
    <table className={styles['table']}>
      <thead>
        <tr className={styles['head-row']}>
          <th
            className={styles['head-col']}
            onClick={() => changeSorting(SORT_TYPE.ARTICLE_TITLE)}
          >
            Article title
          </th>
          <th
            className={styles['head-col']}
            onClick={() => changeSorting(SORT_TYPE.TIME)}
          >
            Last update
          </th>
          <th
            className={styles['head-col']}
            onClick={() => changeSorting(SORT_TYPE.PEREX)}
          >
            Perex
          </th>
          <th className={styles['head-col']}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {articles?.map((article) => (
          <ArticleRow key={article?.articleId} article={article} />
        ))}
      </tbody>
    </table>
  );
};

export default ArticlesTable;
