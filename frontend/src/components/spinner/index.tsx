import clsx from 'clsx';
import { ReactComponent as SpinnerSVG } from 'assets/svg/spinner.svg';

import { SpinnerProps } from './index.types';

import styles from './index.module.scss';

export const Spinner = ({ className, size = 'sm', ...props }: SpinnerProps) => {
  return (
    <SpinnerSVG
      className={clsx(styles['spinner'], styles[`-${size}`], className)}
      {...props}
    />
  );
};

export default Spinner;
