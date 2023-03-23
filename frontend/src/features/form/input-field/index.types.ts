import { ReactNode } from 'react';
import { UseControllerProps } from 'react-hook-form';

export type InputFieldProps = Omit<UseControllerProps, 'control'> & {
  label?: ReactNode;
  type?: string;
};
