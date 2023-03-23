import clsx from 'clsx';
import { useContext } from 'react';

import { DropdownContext } from 'components/dropdown/index.context';

import { DropdownButtonProps } from './index.types';

import styles from './index.module.scss';

export const DropdownButton = ({
  children,
  className,
  ...props
}: DropdownButtonProps) => {
  const { toggle } = useContext(DropdownContext);

  return (
    <div
      aria-label="dropdown"
      role="button"
      tabIndex={-1}
      className={clsx(styles['button'], className)}
      onClick={toggle}
      {...props}
    >
      {children}
    </div>
  );
};

export default DropdownButton;
