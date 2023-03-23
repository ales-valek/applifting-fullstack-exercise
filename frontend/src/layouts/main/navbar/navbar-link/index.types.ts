import { ReactNode } from 'react';

export type NavbarLinkProps = {
  children: ReactNode;
  className?: string;
  to: string;
  match?: string;
};
