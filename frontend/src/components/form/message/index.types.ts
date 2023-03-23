import { ReactNode } from 'react';

export type MessageVariant = 'info' | 'success' | 'error';

export type MessageProps = {
  children?: ReactNode;
  variant?: MessageVariant;
  className?: string;
};
