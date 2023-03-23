import clsx from 'clsx';
import { useMatch } from 'react-router-dom';

import { NavbarLinkProps } from './index.types';

import ButtonLink from 'components/button-link';

import styles from './index.module.scss';

export const NavbarLink = ({
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

export default NavbarLink;
