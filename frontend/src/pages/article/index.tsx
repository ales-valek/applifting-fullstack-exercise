import { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BlogApiHooks } from 'services/api/applifting-blog';
import Comments from './comments';
import Detail from './detail';
import RelatedArticles from './related-articles';

import styles from './index.module.scss';

const ArticlePage = () => {
  const { articleId } = useParams();
  const { data } = BlogApiHooks.articles.useGet({
    articleId: articleId!,
  });

  useLayoutEffect(() => {
    if (data?.title) {
      document.title = `${data?.title} | Applifting Blog`;
    }
  }, [data]);

  return (
    <div className={styles['container']}>
      <Detail className={styles['detail']} />
      <div className={styles['related-articles']}>
        <RelatedArticles />
      </div>
      <Comments className={styles['comments']} />
    </div>
  );
};

export default ArticlePage;
