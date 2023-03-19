import {
  useState,
  useContext,
  createContext,
  ReactNode,
  isValidElement,
} from 'react';

import styles from './index.module.scss';

const DropdownContext = createContext({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});

const DropdownButton = ({ children }: { children: ReactNode }) => {
  const { toggle } = useContext(DropdownContext);

  return <div onClick={toggle}>{children}</div>;
};

const DropdownMenu = ({
  children,
}: {
  children: ReactNode | (({ close }: { close: () => void }) => ReactNode);
}) => {
  const { isOpen, close } = useContext(DropdownContext);
  return isOpen ? (
    <div className={styles['menu']}>
      {isValidElement(children) || typeof children === 'string'
        ? children
        : typeof children === 'function'
        ? children({ close })
        : null}
    </div>
  ) : null;
};

const Dropdown = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen((isOpen) => !isOpen),
      }}
    >
      <div className={styles['wrapper']}>{children}</div>
    </DropdownContext.Provider>
  );
};

Dropdown.Button = DropdownButton;
Dropdown.Menu = DropdownMenu;

export default Dropdown;
