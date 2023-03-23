import { ReactComponent as SpinnerSVG } from 'assets/svg/spinner.svg';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type SpinnerProps = Parameters<typeof SpinnerSVG>[0] & {
  size?: SpinnerSize;
};
