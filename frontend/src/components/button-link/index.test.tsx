import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ButtonLink from '.';

import styles from 'components/button/index.module.scss';

describe('ButtonLink', () => {
  it('Should render correctly', () => {
    render(
      <MemoryRouter>
        <ButtonLink to="/page">Link to page</ButtonLink>
      </MemoryRouter>
    );
    const buttonLinkEl = screen.getByRole('link');
    expect(buttonLinkEl).toHaveTextContent('Link to page');
    expect(buttonLinkEl).toHaveAttribute('href', '/page');
    expect(buttonLinkEl).toHaveClass(styles['-primary']);
  });

  it('Should render disabled version', () => {
    render(
      <MemoryRouter>
        <ButtonLink to="/page" variant="primary" disabled>
          Link to page
        </ButtonLink>
      </MemoryRouter>
    );
    const buttonLinkEl = screen.getByRole('link');
    expect(buttonLinkEl).toHaveAttribute('href', '/');
    expect(buttonLinkEl).toHaveClass(styles['-disabled']);
    expect(buttonLinkEl).toHaveAttribute('aria-disabled', 'true');
  });

  it('Should render className variant', () => {
    render(
      <MemoryRouter>
        <ButtonLink to="/" variant="secondary">
          Link to page
        </ButtonLink>
      </MemoryRouter>
    );
    expect(screen.getByRole('link')).toHaveClass(styles['-secondary']);
  });
});
