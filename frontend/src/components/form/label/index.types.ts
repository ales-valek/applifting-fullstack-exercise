import { LabelHTMLAttributes } from 'react';

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  isRequired?: boolean;
};
