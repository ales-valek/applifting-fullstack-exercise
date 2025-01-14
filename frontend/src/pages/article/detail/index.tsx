import { useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import clsx from 'clsx';

import { getFormatteDateTimeFromTimestamp } from 'helpers/getFormatteDateTimeFromTimestamp';

import { BlogApiHooks } from 'services/api/applifting-blog';

import { DetailProps } from './index.types';

import BlogImage from 'features/blog/image';
import Button from 'components/button';
import Spinner from 'components/spinner';

import styles from './index.module.scss';

const Detail = ({ className }: DetailProps) => {
  const { articleId } = useParams();
  const { data, isLoading, isError, refetch } = BlogApiHooks.articles.useGet({
    articleId: articleId!,
  });

  if (isError) {
    return (
      <div className={styles['error-wrapper']}>
        <h2>Article was unable to load.</h2>
        <Button onClick={() => refetch()}>Try load again</Button>
      </div>
    );
  }

  return isLoading ? (
    <div className={styles['spinner-wrapper']}>
      <Spinner size="xl" className={styles['spinner']} />
    </div>
  ) : (
    <div className={className} data-color-mode="light">
      <h1>{data?.title}</h1>
      <span className={styles['date']}>
        {getFormatteDateTimeFromTimestamp(data?.createdAt ?? '')}
      </span>
      <BlogImage
        imageId={data?.imageId ?? ''}
        alt={data?.title ?? ''}
        className={styles['image']}
      />
      <div className={clsx(styles['content'], 'markdown-content')}>
        <Markdown>{data?.content ?? ''}</Markdown>
      </div>
    </div>
  );
};

export default Detail;
