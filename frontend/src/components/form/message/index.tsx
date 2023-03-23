import clsx from 'clsx';

import { MessageProps } from './index.types';

import styles from './index.module.scss';

export const Message = ({
  children,
  variant = 'info',
  className,
}: MessageProps) => {
  return (
    <p className={clsx(styles['message'], styles[`-${variant}`], className)}>
      {children}
    </p>
  );
};

export default Message;
