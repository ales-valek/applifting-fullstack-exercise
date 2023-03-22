import { render, screen } from '@testing-library/react';

import Spinner from '.';
import styles from './index.module.scss';

describe('Spinner', () => {
  it('Should render correct size', () => {
    render(<Spinner size="lg" data-testid="spinner" />);
    expect(screen.getByTestId('spinner')).toHaveClass(styles['-lg']);
  });
});
