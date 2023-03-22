import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { getFormatteDateTimeFromTimestamp } from 'helpers/getFormatteDateTimeFromTimestamp';

import { Article } from 'services/api/applifting-blog/openapi.types';

import { ArticleRowUI } from '.';

const wrapper = ({ children }: { children: ReactNode }) => {
  return <MemoryRouter>{children}</MemoryRouter>;
};

const timestamp = '2023-03-18T10:28:01.053092';

const mockArticle: Article = {
  articleId: 'test-1',
  title: 'Title #1',
  perex: 'Perex',
  createdAt: timestamp,
  lastUpdatedAt: timestamp,
};

describe('ArticleRow', () => {
  it('Should render correctly', () => {
    render(
      <table>
        <tbody>
          <ArticleRowUI article={mockArticle} />
        </tbody>
      </table>,
      { wrapper }
    );
    screen.getByText('Title #1');
    screen.getByText('Perex');
    screen.getByText(getFormatteDateTimeFromTimestamp(timestamp) ?? '');
    expect(screen.getByRole('link', { name: /edit/i })).toHaveAttribute(
      'href',
      `/admin/articles/${mockArticle?.articleId}/edit`
    );
    screen.getByRole('button', { name: /delete/i });
  });
});
