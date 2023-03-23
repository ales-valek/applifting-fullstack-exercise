import { TextareaHTMLAttributes } from 'react';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  isSuccess?: boolean;
  isError?: boolean;
};
