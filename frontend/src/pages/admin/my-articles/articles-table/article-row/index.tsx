import { Link } from 'react-router-dom';

import { ReactComponent as PencilSVG } from 'assets/svg/pencil.svg';
import { ReactComponent as TrashSVG } from 'assets/svg/trash.svg';

import { Article } from 'services/api/applifting-blog/openapi.types';

import styles from './index.module.scss';
import { BlogApiHooks } from 'services/api/applifting-blog';
import { getFormatteDateTimeFromTimestamp } from 'helpers/getFormatteDateTimeFromTimestamp';
import Spinner from 'components/spinner';

type ArticleRowUIProps = {
  article: Article;
  onDelete?: () => void;
  isDeleting?: boolean;
};

export const ArticleRowUI = ({
  article,
  onDelete,
  isDeleting,
}: ArticleRowUIProps) => {
  return (
    <tr key={article?.articleId} className={styles['row']}>
      <td className={styles['col']}>{article?.title}</td>
      <td className={styles['col']}>
        {getFormatteDateTimeFromTimestamp(article?.lastUpdatedAt ?? '')}
      </td>
      <td className={styles['col']}>{article?.perex}</td>
      <td className={styles['col']}>
        <Link
          to={`/admin/articles/${article?.articleId}/edit`}
          aria-label="edit"
        >
          <PencilSVG />
        </Link>
        <button type="button" aria-label="delete" onClick={onDelete}>
          {!isDeleting ? <TrashSVG /> : <Spinner size="xs" />}
        </button>
      </td>
    </tr>
  );
};

const ArticleRow = ({ article }: { article: Article }) => {
  const { mutate: deleteArticle, isLoading: isDeleting } =
    BlogApiHooks.articles.useDelete();

  const onDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${article?.title}" article?`
      )
    ) {
      deleteArticle({ articleId: article?.articleId! });
    }
  };

  return (
    <ArticleRowUI
      article={article}
      onDelete={onDelete}
      isDeleting={isDeleting}
    />
  );
};

export default ArticleRow;
