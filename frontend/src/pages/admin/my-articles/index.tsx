import { useLayoutEffect } from 'react';
import ArticlesTable from './articles-table';
import ButtonLink from 'components/button-link';

import styles from './index.module.scss';

const MyArticlesPage = () => {
  useLayoutEffect(() => {
    document.title = 'My articles | Applifting Blog';
  }, []);
  return (
    <>
      <div className={styles['heading-wrapper']}>
        <h1>My articles</h1>
        <ButtonLink to="/admin/articles/create">Create new article</ButtonLink>
      </div>
      <div className={styles['table-wrapper']}>
        <ArticlesTable className={styles['table']} />
      </div>
    </>
  );
};

export default MyArticlesPage;
