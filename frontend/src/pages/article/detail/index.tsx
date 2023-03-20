import Button from 'components/button';
import Spinner from 'components/spinner';
import BlogImage from 'features/blog/image';
import { getFormatteDateTimeFromTimestamp } from 'helpers/get-formatted-date-time-from-timestamp';
import Markdown from 'markdown-to-jsx';
import { useParams } from 'react-router-dom';
import { BlogApiHooks } from 'services/api/applifting-blog';

import styles from './index.module.scss';

const Detail = ({ className }: { className?: string }) => {
  const { articleId } = useParams();
  const { data, isLoading, isError, refetch } = BlogApiHooks.articles.useGet({
    articleId: articleId!,
  });

  if (isError) {
    return (
      <div>
        <h2>Article was unable to load</h2>
        <Button onClick={() => refetch()}>Try load again</Button>
      </div>
    );
  }

  return isLoading ? (
    <Spinner size="xl" className={styles['spinner']} />
  ) : (
    <div className={className} data-color-mode="light">
      <h1>{data?.title}</h1>
      <div>
        <span>{getFormatteDateTimeFromTimestamp(data?.createdAt ?? '')}</span>
      </div>
      <BlogImage
        imageId={data?.imageId ?? ''}
        alt={data?.title ?? ''}
        className={styles['image']}
      />
      <Markdown>{data?.content ?? ''}</Markdown>
    </div>
  );
};

export default Detail;
