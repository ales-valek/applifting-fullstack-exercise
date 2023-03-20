import { Link, LinkProps } from 'react-router-dom';
import clsx from 'clsx';

import { ButtonVariants } from 'components/button';
import styles from 'components/button/index.module.scss';

export const ButtonLink = ({
  children,
  className,
  variant = 'primary',
  ...props
}: LinkProps & { variant?: ButtonVariants }) => {
  return (
    <Link
      className={clsx(styles['button'], styles[`-${variant}`], className)}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
