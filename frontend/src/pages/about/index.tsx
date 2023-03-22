import { useLayoutEffect } from 'react';
import Markdown from 'markdown-to-jsx';
import README from './readme.md';
import { useMarkdownFile } from 'hooks/use-markdown-file';
import Spinner from 'components/spinner';
import { Navigate } from 'react-router-dom';

const AboutPage = () => {
  const { value, isLoading, isError } = useMarkdownFile(README);

  useLayoutEffect(() => {
    document.title = 'About | Applifting Blog';
  }, []);

  if (isError) {
    return <Navigate to="/404" />;
  }

  return (
    <>{isLoading ? <Spinner size="xl" /> : <Markdown>{value}</Markdown>}</>
  );
};

export default AboutPage;
