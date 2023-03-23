import { useLayoutEffect } from 'react';
import ArticlesList from './articles-list';

import styles from './index.module.scss';

const HomePage = () => {
  useLayoutEffect(() => {
    document.title = 'Applifting Blog';
  }, []);

  return (
    <>
      <h1>Recent articles</h1>
      <ArticlesList className={styles['articles-list']} />
    </>
  );
};

export default HomePage;
