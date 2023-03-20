import logoImgPath from 'assets/images/logo.png';
import clsx from 'clsx';
import { Link, NavLink, NavLinkProps } from 'react-router-dom';

import { ReactComponent as ArrowSVG } from 'assets/svg/arrow.svg';

import styles from './index.module.scss';
import { useContext } from 'react';
import { AuthContext } from 'services/auth';
import Dropdown from 'components/dropdown';
import Button from 'components/button';
import ButtonLink from 'components/button-link';

const NavbarLink = ({ children, className, ...props }: NavLinkProps) => {
  return (
    <NavLink
      className={({ isActive }) =>
        clsx(styles['nav-link'], isActive && styles['-active'], className)
      }
      {...props}
    >
      {children}
    </NavLink>
  );
};

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className={styles['navbar']}>
      <div className={styles['content']}>
        <img className={styles['logo']} src={logoImgPath} alt="Logo" />
        <div className={styles['menu-links-wrapper']}>
          <NavbarLink to="/">Recent articles</NavbarLink>
          <NavbarLink to="/about">About</NavbarLink>
        </div>
        <div className={styles['right-links-wrapper']}>
          {!isLoggedIn ? (
            <div>
              <Link className={styles['login-link']} to="/admin">
                <span>Log in</span>
                <ArrowSVG className={styles['login-link-arrow']} />
              </Link>
            </div>
          ) : (
            <>
              <div className={styles['right-links']}>
                <Link to="/admin">My articles</Link>
                <Link to="/admin/articles/create">Create article</Link>
              </div>
              <Dropdown>
                <Dropdown.Button>Open</Dropdown.Button>
                <Dropdown.Menu>
                  {({ close }) => (
                    <>
                      <div className={styles['dropdown-links']}>
                        <ButtonLink to="/admin" variant="link-primary">
                          My articles
                        </ButtonLink>
                        <ButtonLink
                          to="/admin/articles/create"
                          variant="link-primary"
                        >
                          Create article
                        </ButtonLink>
                      </div>
                      <Button
                        variant="danger"
                        onClick={() => {
                          logout();
                          close();
                        }}
                      >
                        Log out
                      </Button>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
