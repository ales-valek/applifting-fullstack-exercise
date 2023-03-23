import { InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  isSuccess?: boolean;
  isError?: boolean;
};
