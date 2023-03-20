import clsx from 'clsx';
import { ReactComponent as SpinnerSVG } from 'assets/svg/spinner.svg';

import styles from './index.module.scss';

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type SpinnerProps = Parameters<typeof SpinnerSVG>[0] & {
  size?: SpinnerSize;
};

export const Spinner = ({ className, size = 'sm', ...props }: SpinnerProps) => {
  return (
    <SpinnerSVG
      className={clsx(styles['spinner'], styles[`-${size}`], className)}
      {...props}
    />
  );
};

export default Spinner;
