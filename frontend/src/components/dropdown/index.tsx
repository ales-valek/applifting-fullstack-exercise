import {
  useState,
  useContext,
  createContext,
  ReactNode,
  isValidElement,
  useRef,
} from 'react';
import clsx from 'clsx';

import styles from './index.module.scss';
import useOnClickOutside from 'use-onclickoutside';

const DropdownContext = createContext({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});

export const DropdownButton = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { toggle } = useContext(DropdownContext);

  return (
    <div
      role="button"
      tabIndex={-1}
      className={clsx(styles['button'], className)}
      onClick={toggle}
    >
      {children}
    </div>
  );
};

export const DropdownMenu = ({
  children,
  className,
}: {
  children: ReactNode | (({ close }: { close: () => void }) => ReactNode);
  className?: string;
}) => {
  const { isOpen, close } = useContext(DropdownContext);
  return isOpen ? (
    <div className={clsx(styles['menu'], className)}>
      {isValidElement(children) || typeof children === 'string'
        ? children
        : typeof children === 'function'
        ? children({ close })
        : null}
    </div>
  ) : null;
};

export const Dropdown = ({ children }: { children: ReactNode }) => {
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
