import { useState, useMemo } from 'react';

import { BlogApiHooks } from 'services/api/applifting-blog';
import { Article } from 'services/api/applifting-blog/openapi.types';
import { ReactComponent as FilterArrowsSVG } from 'assets/svg/filter-arrows.svg';

import styles from './index.module.scss';
import ArticleRow from './article-row';
import Spinner from 'components/spinner';
import Button from 'components/button';
import { getSortedArticles } from './helpers';
import { SORT_ORDER, SORT_TYPE } from './constants';

type ArticleTableUIProps = {
  articles: Article[];
  onFilterClick: (type: SORT_TYPE) => void;
  onRefetchClick: () => void;
  isLoading?: boolean;
  isError?: boolean;
};

export const ArticlesTableUI = ({
  articles,
  isLoading,
  isError,
  onFilterClick,
  onRefetchClick,
}: ArticleTableUIProps) => {
  return (
    <div className={styles['wrapper']}>
      {(isLoading || isError) && (
        <div className={styles['overlay']} aria-label="overlay">
          {isLoading && <Spinner size="md" />}
          {isError && (
            <div>
              <h3>Unable to load articles</h3>
              <Button onClick={onRefetchClick}>Try load again</Button>
            </div>
          )}
        </div>
      )}
      <table className={styles['table']}>
        <thead>
          <tr className={styles['head-row']}>
            <th
              className={styles['head-col']}
              onClick={() => onFilterClick(SORT_TYPE.ARTICLE_TITLE)}
            >
              <span>Article title</span>
              <FilterArrowsSVG />
            </th>
            <th
              className={styles['head-col']}
              onClick={() => onFilterClick(SORT_TYPE.TIME)}
            >
              <span>Last update</span>
              <FilterArrowsSVG />
            </th>
            <th
              className={styles['head-col']}
              onClick={() => onFilterClick(SORT_TYPE.PEREX)}
            >
              <span>Perex</span>
              <FilterArrowsSVG />
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
    </div>
  );
};

const ArticlesTable = () => {
  const { data, isFetching, isError, isSuccess, refetch } =
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
    <ArticlesTableUI
      articles={articles}
      isLoading={isFetching}
      isError={isError}
      onFilterClick={changeSorting}
      onRefetchClick={refetch}
    />
  );
};

export default ArticlesTable;
