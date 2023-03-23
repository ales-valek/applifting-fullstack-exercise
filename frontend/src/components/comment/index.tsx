import { ReactComponent as ArrowSVG } from 'assets/svg/chevron.svg';
import Spinner from 'components/spinner';

import styles from './index.module.scss';

type CommentProps = {
  author: string;
  postDate: string;
  content: string;
  score: number;
  onVoteUp: () => void;
  onVoteDown: () => void;
  isCountChanging?: boolean;
};

const Comment = ({
  author,
  postDate,
  content,
  score,
  onVoteUp,
  onVoteDown,
  isCountChanging,
}: CommentProps) => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['top-line']}>
        <span className={styles['author']}>{author}</span>
        <span className={styles['post-date']}>{postDate}</span>
      </div>
      <p className={styles['content']}>{content}</p>
      <div className={styles['bottom-line']}>
        <div className={styles['score-wrapper']}>
          <span className={styles['score']}>{`${
            score > 0 ? '+' : ''
          }${score}`}</span>
          {isCountChanging && (
            <div className={styles['score-spinner-wrapper']}>
              <Spinner size="xs" className={styles['spinner']} />
            </div>
          )}
        </div>
        <button
          aria-label="vote-up"
          className={styles['score-button']}
          onClick={onVoteUp}
          disabled={isCountChanging}
        >
          <ArrowSVG className={styles['score-up-icon']} />
        </button>
        <button
          aria-label="vote-down"
          className={styles['score-button']}
          onClick={onVoteDown}
          disabled={isCountChanging}
        >
          <ArrowSVG className={styles['score-down-icon']} />
        </button>
      </div>
    </div>
  );
};

export default Comment;
