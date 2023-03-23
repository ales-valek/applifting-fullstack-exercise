import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';

import { NUM_OF_ARTICLES_TO_SHOW_PER_PAGE as LIMIT } from './index.constants';

import { ArticlesListProps } from './index.types';

import { getFormatteDateTimeFromTimestamp } from 'helpers/getFormatteDateTimeFromTimestamp';

import { BlogApiHooks } from 'services/api/applifting-blog';

import Pagination from 'components/pagination';
import Spinner from 'components/spinner';
import BlogArticle from 'features/blog/article';

import styles from './index.module.scss';

const ArticlesList = ({ className }: ArticlesListProps) => {
  const navigate = useNavigate();
  const { page } = useParams();
  const offset = ((parseInt(page ?? '') || 1) - 1) * LIMIT;
  const pageNum = Math.floor(offset / LIMIT) + 1;
  const { data, isLoading, isError, refetch } = BlogApiHooks.articles.useGetAll(
    { limit: LIMIT, offset }
  );

  const totalPages = Math.ceil(data?.pagination?.total! / LIMIT);

  useEffect(() => {
    if (pageNum > totalPages) {
      navigate(`/articles/${totalPages}`, { replace: true });
    }
  }, [pageNum, totalPages]);

  return (
    <div className={clsx(styles['container'], className)}>
      {isLoading ? (
        <div className={styles['spinner-wrapper']}>
          <Spinner size="xl" />
        </div>
      ) : (
        data?.items?.map((article, index) => (
          <BlogArticle
            articleUrl={`/article/${article?.articleId}`}
            perex={article?.perex ?? ''}
            title={article?.title ?? ''}
            imageId={article?.imageId ?? ''}
            postDate={
              getFormatteDateTimeFromTimestamp(article?.createdAt ?? '') ?? '-'
            }
            key={index}
          />
        ))
      )}
      {isError && (
        <div>
          <span>Unable to load</span>
          <button type="button" onClick={() => refetch()}>
            Refetch
          </button>
        </div>
      )}
      <div className={styles['pagination-wrapper']}>
        <div className={styles['pagination']}>
          <Pagination
            current={pageNum}
            total={totalPages}
            onPageChange={(page) => navigate(`/articles/${page}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticlesList;
