import clsx from 'clsx';

import { ButtonProps } from './index.types';

import styles from './index.module.scss';

export const Button = ({
  children,
  className,
  variant = 'primary',
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        styles['button'],
        styles[`-${variant}`],
        disabled && styles['-disabled'],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
