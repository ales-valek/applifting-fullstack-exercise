import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './index.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  isSuccess?: boolean;
  isError?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', className, isSuccess, isError, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={clsx(
          styles['input'],
          isSuccess && styles[`-success`],
          isError && styles[`-error`],
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
