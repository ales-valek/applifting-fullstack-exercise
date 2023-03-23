import { useState, useMemo } from 'react';
import clsx from 'clsx';

import { ArticleTableUIProps } from './index.types';

import { SORT_ORDER, SORT_TYPE } from './constants';

import { BlogApiHooks } from 'services/api/applifting-blog';

import { getSortedArticles } from './helpers';

import { ReactComponent as FilterArrowsSVG } from 'assets/svg/filter-arrows.svg';

import ArticleRow from './article-row';
import Spinner from 'components/spinner';
import Button from 'components/button';

import styles from './index.module.scss';

export const ArticlesTableUI = ({
  className,
  articles,
  isLoading,
  isError,
  onFilterClick,
  onRefetchClick,
}: ArticleTableUIProps) => {
  return (
    <div className={clsx(styles['wrapper'], className)}>
      {(isLoading || isError) && (
        <div className={styles['overlay']} aria-label="overlay">
          {isLoading && <Spinner size="lg" />}
          {isError && (
            <div className={styles['refetch-wrapper']}>
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
              <div className={styles['head-col-content']}>
                <span>Article title</span>
                <FilterArrowsSVG />
              </div>
            </th>
            <th
              className={styles['head-col']}
              onClick={() => onFilterClick(SORT_TYPE.TIME)}
            >
              <div className={styles['head-col-content']}>
                <span>Last update</span>
                <FilterArrowsSVG />
              </div>
            </th>
            <th
              className={styles['head-col']}
              onClick={() => onFilterClick(SORT_TYPE.PEREX)}
            >
              <div className={styles['head-col-content']}>
                <span>Perex</span>
                <FilterArrowsSVG />
              </div>
            </th>
            <th className={clsx(styles['head-col'], styles['-actions'])}>
              Actions
            </th>
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

type ArticleTableProps = {
  className?: string;
};

const ArticlesTable = ({ className }: ArticleTableProps) => {
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
      className={className}
      articles={articles}
      isLoading={isFetching}
      isError={isError}
      onFilterClick={changeSorting}
      onRefetchClick={refetch}
    />
  );
};

export default ArticlesTable;
