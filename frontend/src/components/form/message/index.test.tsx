import { render, screen } from '@testing-library/react';

import Message from '.';

import styles from './index.module.scss';

describe('Message', () => {
  it('Should render correctly', () => {
    render(<Message>Message</Message>);
    const messageEl = screen.getByText('Message');
    expect(messageEl).toHaveClass(styles['-info']);
  });

  it('Should render correct variant className', () => {
    render(<Message variant="success">Message</Message>);
    const messageEl = screen.getByText('Message');
    expect(messageEl).toHaveClass(styles['-success']);
  });
});
