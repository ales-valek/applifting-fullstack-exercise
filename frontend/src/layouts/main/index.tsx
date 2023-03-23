import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Navbar from './navbar';

import styles from './index.module.scss';

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    document.body.scrollIntoView({ behavior: 'smooth' });
  }, [location.pathname]);

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
