import { ReactNode } from 'react';
import { UseControllerProps } from 'react-hook-form';

export type TextareaFieldProps = Omit<UseControllerProps, 'control'> & {
  label?: ReactNode;
  className?: string;
};
