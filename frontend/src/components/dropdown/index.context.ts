import { createContext } from 'react';

export const DropdownContext = createContext({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});
