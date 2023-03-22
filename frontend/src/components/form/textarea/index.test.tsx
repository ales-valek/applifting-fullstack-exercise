import { render, screen } from '@testing-library/react';

import Textarea from '.';

import styles from './index.module.scss';

describe('Textarea', () => {
  it('Should render correctly', () => {
    render(<Textarea value="" onChange={() => {}} placeholder="Test value" />);
    screen.getByPlaceholderText('Test value');
  });

  it('Should render correct value', () => {
    render(<Textarea value="value" onChange={() => {}} />);
    screen.getByDisplayValue('value');
  });

  it('Should render success variant', () => {
    render(<Textarea value="value" onChange={() => {}} isSuccess />);
    expect(screen.getByDisplayValue('value')).toHaveClass(styles['-success']);
  });

  it('Should render error variant', () => {
    render(<Textarea value="value" onChange={() => {}} isError />);
    expect(screen.getByDisplayValue('value')).toHaveClass(styles['-error']);
  });
});
