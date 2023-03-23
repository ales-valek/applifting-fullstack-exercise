import { useState, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { DropdownContext } from './index.context';

import DropdownButton from './button';
import DropdownMenu from './menu';

import { DropdownProps } from './index.types';

import styles from './index.module.scss';

export const Dropdown = ({ children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((isOpen) => !isOpen);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(wrapperRef, close);

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggle,
      }}
    >
      <div ref={wrapperRef} className={styles['wrapper']}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

Dropdown.Button = DropdownButton;
Dropdown.Menu = DropdownMenu;

export default Dropdown;
