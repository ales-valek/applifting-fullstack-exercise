import { Outlet } from 'react-router-dom';
import Navbar from './navbar';

import styles from './index.module.scss';

const MainLayout = () => {
  return (
    <div className={styles['layout-wrapper']}>
      <Navbar />
      <main className={styles['content-wrapper']}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
