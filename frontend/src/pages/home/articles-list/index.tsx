import Article from 'features/blog/article';
import Pagination from 'components/pagination';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogApiHooks } from 'services/api/applifting-blog';

import styles from './index.module.scss';
import { getFormatteDateTimeFromTimestamp } from 'helpers/get-formatted-date-time-from-timestamp';

const LIMIT = 2;

const ArticlesList = () => {
  const navigate = useNavigate();
  const { page } = useParams();
  const offset = ((parseInt(page ?? '') || 1) - 1) * LIMIT;
  const pageNum = Math.floor(offset / LIMIT) + 1;
  const { data, isLoading, isError, refetch } = BlogApiHooks.articles.useGetAll(
    { limit: LIMIT, offset }
  );

  return (
    <div className={styles['container']}>
      {isLoading
        ? 'Loading...'
        : data?.items?.map((article, index) => (
            <Article
              articleUrl={`/article/${article?.articleId}`}
              perex={article?.perex ?? ''}
              title={article?.title ?? ''}
              imgId={article?.imageId ?? ''}
              postDate={getFormatteDateTimeFromTimestamp(
                article?.createdAt ?? ''
              )}
              key={index}
            />
          ))}
      {isError && (
        <div>
          <span>Unable to load</span>
          <button type="button" onClick={() => refetch()}>
            Refetch
          </button>
        </div>
      )}
      <div className={styles['pagination-wrapper']}>
        <Pagination
          current={pageNum}
          total={Math.ceil(data?.pagination?.total! / LIMIT)}
          onPageChange={(page) => navigate(`/articles/${page}`)}
        />
      </div>
    </div>
  );
};

export default ArticlesList;
