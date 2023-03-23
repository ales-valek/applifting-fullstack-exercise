import { ButtonHTMLAttributes } from 'react';

export type ButtonVariants =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'link-primary'
  | 'link-secondary'
  | 'link-success'
  | 'link-danger';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariants;
};
