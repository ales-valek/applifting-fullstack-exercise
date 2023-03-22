import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Article } from 'services/api/applifting-blog/openapi.types';

import { ArticlesTableUI } from '.';
import { SORT_TYPE } from './constants';

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryClientProvider>
);

const mockArticles: Article[] = [
  {
    articleId: 'test-1',
    title: 'Title #1',
    perex: 'Perex 1',
    createdAt: '2023-03-18T10:28:01.053092',
    lastUpdatedAt: '2023-03-18T10:28:01.053092',
  },
  {
    articleId: 'test-2',
    title: 'Title #2',
    perex: 'Perex 2',
    createdAt: '2023-03-19T10:28:01.053092',
    lastUpdatedAt: '2023-03-19T10:28:01.053092',
  },
  {
    articleId: 'test-3',
    title: 'Title #3',
    perex: 'Perex 3',
    createdAt: '2023-03-20T10:28:01.053092',
    lastUpdatedAt: '2023-03-20T10:28:01.053092',
  },
  {
    articleId: 'test-4',
    title: 'Title #4',
    perex: 'Perex 4',
    createdAt: '2023-03-21T10:28:01.053092',
    lastUpdatedAt: '2023-03-21T10:28:01.053092',
  },
];

const onFilterClick = jest.fn();

describe('ArticlesTable', () => {
  it('Should render correctly', async () => {
    render(
      <ArticlesTableUI
        articles={mockArticles}
        onFilterClick={onFilterClick}
        onRefetchClick={() => {}}
      />,
      {
        wrapper,
      }
    );
    screen.getByText(/article title/i);
    screen.getByText(/last update/i);
    screen.getByText('Perex');
    screen.getByText(/actions/i);
  });

  it('Should fire correct sort types', async () => {
    render(
      <ArticlesTableUI
        articles={mockArticles}
        onFilterClick={onFilterClick}
        onRefetchClick={() => {}}
      />,
      {
        wrapper,
      }
    );
    const titleHeadingEl = screen.getByText(/article title/i);
    const lastUpdateHeadingEl = screen.getByText(/last update/i);
    const perexHeadingEl = screen.getByText('Perex');

    userEvent.click(titleHeadingEl);
    userEvent.click(lastUpdateHeadingEl);
    userEvent.click(perexHeadingEl);

    expect(onFilterClick.mock.calls).toEqual([
      [SORT_TYPE.ARTICLE_TITLE],
      [SORT_TYPE.TIME],
      [SORT_TYPE.PEREX],
    ]);
  });

  it('Should render loading state on load', async () => {
    render(
      <ArticlesTableUI
        articles={mockArticles}
        onFilterClick={onFilterClick}
        onRefetchClick={() => {}}
        isLoading
      />,
      {
        wrapper,
      }
    );
    screen.getByLabelText('overlay');
  });

  it('Should render error state on loading error', async () => {
    render(
      <ArticlesTableUI
        articles={mockArticles}
        onFilterClick={onFilterClick}
        onRefetchClick={() => {}}
        isError
      />,
      {
        wrapper,
      }
    );
    screen.getByLabelText('overlay');
    screen.getByRole('button', { name: /try load again/i });
  });
});
