import { Link, LinkProps } from 'react-router-dom';
import clsx from 'clsx';

import { ButtonVariants } from 'components/button';
import styles from 'components/button/index.module.scss';

export const ButtonLink = ({
  children,
  className,
  variant = 'primary',
  disabled,
  to,
  ...props
}: LinkProps & { variant?: ButtonVariants; disabled?: boolean }) => {
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
