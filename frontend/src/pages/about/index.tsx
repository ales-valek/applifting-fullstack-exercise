import { useLayoutEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import { useMarkdownFile } from 'hooks/use-markdown-file';

import README from './readme.md';

import Spinner from 'components/spinner';

import styles from './index.module.scss';

const AboutPage = () => {
  const { value, isLoading, isError } = useMarkdownFile(README);

  useLayoutEffect(() => {
    document.title = 'About | Applifting Blog';
  }, []);

  if (isError) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      {isLoading ? (
        <div className={styles['spinner-wrapper']}>
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="markdown-content">
          <Markdown>{value}</Markdown>
        </div>
      )}
    </>
  );
};

export default AboutPage;
