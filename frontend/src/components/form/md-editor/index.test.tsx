import { render, screen } from '@testing-library/react';

import MdEditor from '.';

describe('MarkdownEditor', () => {
  it('Should render correctly', async () => {
    render(<MdEditor value="# Title" />);
    screen.getByRole('heading', { name: /Title/i });
  });
});
