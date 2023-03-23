import { isValidElement, useContext } from 'react';
import clsx from 'clsx';

import { DropdownContext } from 'components/dropdown/index.context';
import { DropdownMenuProps } from './index.types';

import styles from './index.module.scss';

export const DropdownMenu = ({
  children,
  className,
  ...props
}: DropdownMenuProps) => {
  const { isOpen, close } = useContext(DropdownContext);
  return isOpen ? (
    <div className={clsx(styles['menu'], className)} {...props}>
      {isValidElement(children) || typeof children === 'string'
        ? children
        : typeof children === 'function'
        ? children({ close })
        : null}
    </div>
  ) : (
    <></>
  );
};

export default DropdownMenu;
