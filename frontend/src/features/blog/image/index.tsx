import cx from 'clsx';

import { BlogApiHooks } from 'services/api/applifting-blog';

import { BlogImageProps } from './index.types';

import styles from './index.module.scss';

export const BlogImage = ({ imageId, alt, className }: BlogImageProps) => {
  const { data, isLoading, isError } = BlogApiHooks.images.useGet({ imageId });

  if (isLoading || isError) {
    return <div className={cx(styles['image'], className)} />;
  }

  return (
    <img
      src={data?.imageUrl}
      alt={alt}
      className={cx(styles['image'], className)}
    />
  );
};

export default BlogImage;
