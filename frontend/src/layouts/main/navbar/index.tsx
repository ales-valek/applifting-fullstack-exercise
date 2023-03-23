import logoImgPath from 'assets/images/logo.png';
import clsx from 'clsx';
import { useMatch } from 'react-router-dom';

import { ReactComponent as ArrowSVG } from 'assets/svg/arrow.svg';
import { ReactComponent as ArrowStepperSVG } from 'assets/svg/arrow-stepper.svg';

import styles from './index.module.scss';
import { ReactNode, useContext } from 'react';
import { AuthContext } from 'services/auth';
import Dropdown from 'components/dropdown';
import Button from 'components/button';
import ButtonLink from 'components/button-link';

type NavbarLinkProps = {
  children: ReactNode;
  className?: string;
  to: string;
  match?: string;
};

const NavbarLink = ({
  children,
  className,
  to,
  match,
  ...props
}: NavbarLinkProps) => {
  const isActive = useMatch(match ?? to);

  return (
    <ButtonLink
      to={to}
      variant="link-primary"
      className={clsx(styles['nav-link'], isActive && styles['-active'])}
      {...props}
    >
      {children}
    </ButtonLink>
  );
};

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className={styles['navbar']}>
      <div className={styles['content']}>
        <img className={styles['logo']} src={logoImgPath} alt="Logo" />
        <div className={styles['menu-links-wrapper']}>
          <NavbarLink to="/articles" match="/articles/*">
            Recent articles
          </NavbarLink>
          <NavbarLink to="/about">About</NavbarLink>
        </div>
        <div className={styles['right-links-wrapper']}>
          {!isLoggedIn ? (
            <div>
              <ButtonLink
                variant="link-primary"
                className={styles['login-link']}
                to="/admin/login"
              >
                <span>Log in</span>
                <ArrowSVG className={styles['login-link-arrow']} />
              </ButtonLink>
            </div>
          ) : (
            <>
              <div className={styles['right-links']}>
                <NavbarLink to="/admin/articles">My articles</NavbarLink>
                <NavbarLink to="/admin/articles/create">
                  Create article
                </NavbarLink>
              </div>
              <Dropdown>
                <Dropdown.Button className={styles['dropdown-button']}>
                  <ArrowStepperSVG className={styles['avatar-arrow']} />
                  <div className={styles['avatar']}></div>
                </Dropdown.Button>
                <Dropdown.Menu className={styles['dropdown-menu']}>
                  {({ close }) => (
                    <>
                      <div className={styles['dropdown-links']}>
                        <ButtonLink
                          className={styles['dropdown-link']}
                          to="/admin"
                          variant="link-primary"
                          onClick={close}
                        >
                          My articles
                        </ButtonLink>
                        <ButtonLink
                          className={styles['dropdown-link']}
                          to="/admin/articles/create"
                          variant="link-primary"
                          onClick={close}
                        >
                          Create article
                        </ButtonLink>
                      </div>
                      <Button
                        className={styles['dropdown-link']}
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
