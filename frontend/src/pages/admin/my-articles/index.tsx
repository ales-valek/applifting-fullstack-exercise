import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import ArticlesTable from './articles-table';

const MyArticlesPage = () => {
  useLayoutEffect(() => {
    document.title = 'My articles | Applifting Blog';
  }, []);
  return (
    <>
      <div>
        <h1>My articles</h1>
        <Link to="/admin/articles/create">Create new article</Link>
      </div>
      <div>
        <ArticlesTable />
      </div>
    </>
  );
};

export default MyArticlesPage;
