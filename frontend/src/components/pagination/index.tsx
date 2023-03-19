import ReactResponsivePagination from 'react-responsive-pagination';

import styles from './index.module.scss';

const Pagination = (props: Parameters<typeof ReactResponsivePagination>[0]) => {
  return (
    <ReactResponsivePagination
      className={styles['wrapper']}
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
