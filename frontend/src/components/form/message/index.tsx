import clsx from 'clsx';

import { MessageProps } from './index.types';

import styles from './index.module.scss';

export const Message = ({ children, variant = 'info' }: MessageProps) => {
  return (
    <p className={clsx(styles['message'], styles[`-${variant}`])}>{children}</p>
  );
};

export default Message;
