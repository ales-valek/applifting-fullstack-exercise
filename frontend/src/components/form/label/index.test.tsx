import { screen, render } from '@testing-library/react';

import Label from '.';
import styles from './index.module.scss';

describe('Label', () => {
  it('Should render correctly', () => {
    render(<Label>Label</Label>);
    screen.getByText('Label');
  });

  it('Should render required className', () => {
    render(<Label isRequired>Label</Label>);
    expect(screen.getByText('Label')).toHaveClass(styles['-required']);
  });
});
