import { useLayoutEffect } from 'react';
import ArticlesTable from './articles-table';
import ButtonLink from 'components/button-link';

const MyArticlesPage = () => {
  useLayoutEffect(() => {
    document.title = 'My articles | Applifting Blog';
  }, []);
  return (
    <>
      <div>
        <h1>My articles</h1>
        <ButtonLink to="/admin/articles/create">Create new article</ButtonLink>
      </div>
      <div>
        <ArticlesTable />
      </div>
    </>
  );
};

export default MyArticlesPage;
