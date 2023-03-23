import { ReactNode } from 'react';

export type DropdownMenuProps = {
  children: ReactNode | (({ close }: { close: () => void }) => ReactNode);
  className?: string;
};
