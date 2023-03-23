import clsx from 'clsx';

import { LabelProps } from './index.types';

import styles from './index.module.scss';

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
