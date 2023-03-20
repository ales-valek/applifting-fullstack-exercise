import clsx from 'clsx';
import { LabelHTMLAttributes } from 'react';

import styles from './index.module.scss';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  isRequired?: boolean;
};

const Label = ({ children, className, isRequired, ...props }: LabelProps) => {
  return (
    <label
      className={clsx(
        styles['label'],
        isRequired && styles['-required'],
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
