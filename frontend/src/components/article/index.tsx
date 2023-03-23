import ButtonLink from 'components/button-link';

import { ArticleProps } from './index.types';

import styles from './index.module.scss';

export const Article = ({
  imageUrl,
  articleUrl,
  title,
  postDate,
  perex,
}: ArticleProps) => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['image-wrapper']}>
        <img className={styles['image']} src={imageUrl} alt={title} />
      </div>
      <div className={styles['info-wrapper']}>
        <h2 className={styles['title']}>{title}</h2>
        <div className={styles['info-row']}>
          <span className={styles['date']}>{postDate}</span>
        </div>
        <p className={styles['perex']}>{perex}</p>
        <div className={styles['bottom-info-row']}>
          <ButtonLink
            className={styles['link']}
            variant="link-primary"
            to={articleUrl}
          >
            Read whole article
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};

export default Article;
