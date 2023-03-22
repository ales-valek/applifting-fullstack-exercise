import { ReactNode } from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Article from '.';

import { getFormatteDateTimeFromTimestamp } from 'helpers/getFormatteDateTimeFromTimestamp';

const wrapper = ({ children }: { children: ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

describe('Article', () => {
  it('Should render correctly', () => {
    const postDate = getFormatteDateTimeFromTimestamp(
      '2023-03-18T10:28:01.053092'
    );
    render(
      <Article
        articleUrl="/url-to-article"
        imageUrl="/image-url.png"
        perex="Perex"
        postDate={postDate!}
        title="Title"
      />,
      { wrapper }
    );
    screen.getByText('Title');
    screen.getByText('Perex');
    screen.getByText(postDate!);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/image-url.png');
    expect(
      screen.getByRole('link', { name: /Read whole article/i })
    ).toHaveAttribute('href', '/url-to-article');
  });
});
