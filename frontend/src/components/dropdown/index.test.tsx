import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Dropdown from '.';

enum TEST_ID {
  BUTTON = 'dropdown-button',
  MENU = 'dropdown-menu',
}

const renderComponent = () =>
  render(
    <Dropdown>
      <Dropdown.Button data-testid={TEST_ID.BUTTON}>
        <div>Open dropdown</div>
      </Dropdown.Button>
      <Dropdown.Menu data-testid={TEST_ID.MENU}>
        {({ close }) => (
          <div>
            <button onClick={close}>Close menu</button>
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );

describe('Dropdown', () => {
  it('Should render correctly', async () => {
    renderComponent();
    expect(screen.getByTestId(TEST_ID.BUTTON)).toBeInTheDocument();
    expect(screen.getByText(/open dropdown/i)).toBeInTheDocument();
    expect(screen.queryByTestId(TEST_ID.MENU)).not.toBeInTheDocument();
  });

  it('Opens and closes dropdown menu correctly on dropdown button click', async () => {
    renderComponent();
    userEvent.click(screen.getByTestId(TEST_ID.BUTTON));
    expect(screen.getByTestId(TEST_ID.MENU)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TEST_ID.BUTTON));
    expect(screen.queryByTestId(TEST_ID.MENU)).not.toBeInTheDocument();
  });

  it('Closes dropdown menu correctly on click outside', async () => {
    renderComponent();
    userEvent.click(screen.getByTestId(TEST_ID.BUTTON));
    expect(screen.getByTestId(TEST_ID.MENU)).toBeInTheDocument();
    userEvent.click(document.body);
    expect(screen.queryByTestId(TEST_ID.MENU)).not.toBeInTheDocument();
  });

  it('Closes dropdown menu correctly from inside menu', async () => {
    renderComponent();
    userEvent.click(screen.getByTestId(TEST_ID.BUTTON));
    expect(screen.getByTestId(TEST_ID.MENU)).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /close menu/i }));
    expect(screen.queryByTestId(TEST_ID.MENU)).not.toBeInTheDocument();
  });
});
