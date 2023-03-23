import clsx from 'clsx';
import ReactResponsivePagination from 'react-responsive-pagination';

import { PaginationProps } from './index.types';

import styles from './index.module.scss';

const Pagination = ({ className, ...props }: PaginationProps) => {
  return (
    <ReactResponsivePagination
      className={clsx(styles['wrapper'], className)}
      pageItemClassName={styles['item']}
      activeItemClassName={styles['-active']}
      disabledItemClassName={styles['-disabled']}
      pageLinkClassName={styles['link']}
      srOnlyClassName={styles['sr-only']}
      renderNav={false}
      linkHref="omit"
      narrowStrategy={'dropEllipsis'}
      {...props}
    />
  );
};

export default Pagination;
