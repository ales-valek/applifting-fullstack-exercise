import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoginForm from '.';

describe('LoginForm', () => {
  const onSubmit = jest.fn();

  it('Should fill and submit the form', async () => {
    render(<LoginForm onSubmit={onSubmit} />);
    const usernameInputEl = screen.getByLabelText(/username/i);
    const passwordInputEl = screen.getByLabelText(/password/i);
    const submitButtonEl = screen.getByRole('button', { name: /log in/i });

    // eslint-disable-next-line
    await act(async () => {
      await userEvent.type(usernameInputEl, 'Username1');
      await userEvent.type(passwordInputEl, 'password_123!');
      await userEvent.click(submitButtonEl);
    });

    expect(usernameInputEl).toHaveDisplayValue('Username1');
    expect(passwordInputEl).toHaveDisplayValue('password_123!');
    expect(onSubmit).toBeCalledWith(
      { username: 'Username1', password: 'password_123!' },
      expect.any(Object)
    );
  });
});
