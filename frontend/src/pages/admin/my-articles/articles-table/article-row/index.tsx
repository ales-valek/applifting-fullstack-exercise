import { Link } from 'react-router-dom';

import { ReactComponent as PencilSVG } from 'assets/svg/pencil.svg';
import { ReactComponent as TrashSVG } from 'assets/svg/trash.svg';

import { Article } from 'services/api/applifting-blog/openapi.types';

import styles from './index.module.scss';
import { BlogApiHooks } from 'services/api/applifting-blog';
import { getFormatteDateTimeFromTimestamp } from 'helpers/get-formatted-date-time-from-timestamp';

const ArticleRow = ({ article }: { article: Article }) => {
  const { mutate: deleteArticle, isLoading: isDeleting } =
    BlogApiHooks.articles.useDelete();

  const onDelete = (article: Article) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${article?.title}" article?`
      )
    ) {
      deleteArticle({ articleId: article?.articleId! });
    }
  };

  return (
    <tr key={article?.articleId} className={styles['row']}>
      <td className={styles['col']}>{article?.title}</td>
      <td className={styles['col']}>
        {getFormatteDateTimeFromTimestamp(article?.lastUpdatedAt ?? '')}
      </td>
      <td className={styles['col']}>{article?.perex}</td>
      <td className={styles['col']}>
        <Link to={`/admin/articles/${article?.articleId}/edit`}>
          <PencilSVG />
        </Link>
        <button type="button" onClick={() => onDelete(article)}>
          {!isDeleting ? <TrashSVG /> : 'Deleting...'}
        </button>
      </td>
    </tr>
  );
};

export default ArticleRow;
