import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { ButtonLinkProps } from './index.types';

import styles from 'components/button/index.module.scss';

export const ButtonLink = ({
  children,
  className,
  variant = 'primary',
  disabled,
  to,
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      aria-disabled={disabled ? 'true' : undefined}
      className={clsx(
        styles['button'],
        styles[`-${variant}`],
        disabled && styles['-disabled'],
        className
      )}
      to={disabled ? '#' : to}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
