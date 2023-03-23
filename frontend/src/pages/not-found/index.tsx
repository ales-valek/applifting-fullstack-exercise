import ButtonLink from 'components/button-link';

import styles from './index.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles['heading-wrapper']}>
      <h1>Page was not found</h1>
      <ButtonLink variant="link-primary" to="/">
        Back to homepage
      </ButtonLink>
    </div>
  );
};

export default NotFoundPage;
