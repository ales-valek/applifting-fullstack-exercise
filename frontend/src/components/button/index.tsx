import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './index.module.scss';

export type ButtonVariants =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'link-primary'
  | 'link-secondary'
  | 'link-success'
  | 'link-danger';

export const Button = ({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariants }) => {
  return (
    <button
      className={clsx(styles['button'], styles[`-${variant}`], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;