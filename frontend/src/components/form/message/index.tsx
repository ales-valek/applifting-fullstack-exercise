import { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './index.module.scss';

type MessageVariant = 'info' | 'success' | 'error';

type MessageProps = {
  children?: ReactNode;
  variant?: MessageVariant;
};

export const Message = ({ children, variant = 'info' }: MessageProps) => {
  return (
    <p className={clsx(styles['message'], styles[`-${variant}`])}>{children}</p>
  );
};

export default Message;
