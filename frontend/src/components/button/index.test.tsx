import { render, screen } from '@testing-library/react';
import Button from '.';

import styles from 'components/button/index.module.scss';

describe('Button', () => {
  it('Should render correctly', () => {
    render(<Button>Button</Button>);
    const buttonEl = screen.getByRole('button');
    expect(buttonEl).toHaveTextContent('Button');
    expect(buttonEl).toHaveClass(styles['-primary']);
  });

  it('Should render disabled version', () => {
    render(
      <Button variant="primary" disabled>
        Button
      </Button>
    );
    const buttonEl = screen.getByRole('button');
    expect(buttonEl).toHaveClass(styles['-disabled']);
  });

  it('Should render className variant', () => {
    render(<Button variant="success">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass(styles['-success']);
  });
});
