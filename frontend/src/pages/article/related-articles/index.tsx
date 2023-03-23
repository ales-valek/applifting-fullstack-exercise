import clsx from 'clsx';
import Button from 'components/button';
import Spinner from 'components/spinner';
import { Link, useParams } from 'react-router-dom';

import { BlogApiHooks } from 'services/api/applifting-blog';

import { NUM_OF_ARTICLES_TO_SHOW } from './index.constants';

import { RelatedArticlesProps } from './index.types';

import styles from './index.module.scss';

const RelatedArticles = ({ className }: RelatedArticlesProps) => {
  const { articleId } = useParams();
  const { data, isLoading, isError, refetch } = BlogApiHooks.articles.useGetAll(
    { limit: NUM_OF_ARTICLES_TO_SHOW, offset: 0 }
  );

  const items = data?.items?.filter(
    (article) => article?.articleId !== articleId
  );

  return (
    <div className={clsx(styles['wrapper'], className)}>
      <h2 className={styles['heading']}>Related articles</h2>
      <div className={styles['container']}>
        {isError ? (
          <div className={styles['error-wrapper']}>
            <p>Articles were unable to load.</p>
            <Button onClick={() => refetch()}>Try load again</Button>
          </div>
        ) : (
          <>
            {isLoading ? (
              <div className={styles['spinner-wrapper']}>
                <Spinner size="md" />
              </div>
            ) : (
              items?.map((article) => (
                <Link
                  key={article?.articleId}
                  to={`/article/${article?.articleId}`}
                  className={styles['article']}
                >
                  <h3 className={styles['title']}>{article?.title}</h3>
                  <div className={styles['perex']}>{article?.perex}</div>
                </Link>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RelatedArticles;
