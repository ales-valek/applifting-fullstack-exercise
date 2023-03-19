import { useLayoutEffect } from 'react';
import ArticlesList from './articles-list';

const HomePage = () => {
  useLayoutEffect(() => {
    document.title = 'Applifting Blog';
  }, []);

  return (
    <>
      <h1>Recent articles</h1>
      <ArticlesList />
    </>
  );
};

export default HomePage;
