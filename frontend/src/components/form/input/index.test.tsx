import { render, screen } from '@testing-library/react';

import Input from '.';

import styles from './index.module.scss';

describe('Input', () => {
  it('Should render correctly', () => {
    render(<Input value="" onChange={() => {}} placeholder="Test value" />);
    screen.getByPlaceholderText('Test value');
  });

  it('Should render correct value', () => {
    render(<Input value="value" onChange={() => {}} />);
    screen.getByDisplayValue('value');
  });

  it('Should render success variant', () => {
    render(<Input value="value" onChange={() => {}} isSuccess />);
    expect(screen.getByDisplayValue('value')).toHaveClass(styles['-success']);
  });

  it('Should render error variant', () => {
    render(<Input value="value" onChange={() => {}} isError />);
    expect(screen.getByDisplayValue('value')).toHaveClass(styles['-error']);
  });
});
