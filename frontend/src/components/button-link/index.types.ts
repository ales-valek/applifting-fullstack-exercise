import { LinkProps } from 'react-router-dom';

import { ButtonVariants } from 'components/button/index.types';

export type ButtonLinkProps = LinkProps & {
  variant?: ButtonVariants;
  disabled?: boolean;
};
