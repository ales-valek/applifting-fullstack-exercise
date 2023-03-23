import { forwardRef } from 'react';
import clsx from 'clsx';

import { TextareaProps } from './index.types';

import styles from './index.module.scss';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isSuccess, isError, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(
          styles['textarea'],
          isSuccess && styles[`-success`],
          isError && styles[`-error`],
          className
        )}
        {...props}
      ></textarea>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
