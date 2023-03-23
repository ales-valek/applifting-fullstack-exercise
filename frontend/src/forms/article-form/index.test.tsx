import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ArticleForm from '.';

describe('ArticleForm', () => {
  const onSubmit = jest.fn();
  global.URL.createObjectURL = jest.fn();

  it('Should fill and submit create article form', async () => {
    render(<ArticleForm type="create" onSubmit={onSubmit} />);

    const file = new File(['test'], 'testfile.png', { type: 'image/png' });

    screen.getByText(/Create article/i);
    const titleInputEl = screen.getByLabelText('Article title');
    const perexInputEl = screen.getByLabelText('Perex');
    const imageUploadInputEl = screen.getByLabelText('Featured Image');
    const contentInputEl = screen.getByLabelText('Content');
    const submitButtonEl = screen.getByText(/Publish article/i);

    expect(imageUploadInputEl).not.toBeVisible();

    // eslint-disable-next-line
    await act(async () => {
      await userEvent.type(titleInputEl, 'Title');
      await userEvent.type(perexInputEl, 'Perex ....');
      await userEvent.upload(imageUploadInputEl, file);
      await userEvent.type(
        contentInputEl,
        'Very long content containing a lot of information...'
      );
      await userEvent.click(submitButtonEl);
    });

    expect(titleInputEl).toHaveDisplayValue('Title');
    expect(perexInputEl).toHaveDisplayValue('Perex ....');
    expect(contentInputEl).toHaveDisplayValue(
      'Very long content containing a lot of information...'
    );

    expect(onSubmit).toBeCalledWith(
      {
        title: 'Title',
        perex: 'Perex ....',
        featuredImage: file,
        content: 'Very long content containing a lot of information...',
      },
      expect.any(Object)
    );
  });

  it('Should fill and submit edit article form', async () => {
    const originalFile = new File(['originalFile'], 'original', {
      type: 'image/png',
    });

    render(
      <ArticleForm
        type="edit"
        initialTitle="Title"
        initialPerex="Perex"
        initialFeaturedImage={originalFile}
        initialContent="Very long content containing a lot of information..."
        onSubmit={onSubmit}
      />
    );

    screen.getByText(/Edit article/i);
    const titleInputEl = screen.getByLabelText('Article title');
    const perexInputEl = screen.getByLabelText('Perex');
    const imageUploadInputEl = screen.getByLabelText('Featured Image');
    const contentInputEl = screen.getByLabelText('Content');
    const submitButtonEl = screen.getByText(/Publish article/i);

    expect(imageUploadInputEl).not.toBeVisible();

    expect(titleInputEl).toHaveDisplayValue('Title');
    expect(perexInputEl).toHaveDisplayValue('Perex');
    expect(contentInputEl).toHaveDisplayValue(
      'Very long content containing a lot of information...'
    );

    const newFile = new File(['newFile'], 'newfile.png', { type: 'image/png' });

    // eslint-disable-next-line
    await act(async () => {
      await userEvent.type(titleInputEl, ' #1');
      await userEvent.type(perexInputEl, ' detail');
      await userEvent.click(screen.getByRole('button', { name: /Delete/i }));
      await userEvent.upload(imageUploadInputEl, newFile);
      await userEvent.type(contentInputEl, ' And more...');
      await userEvent.click(submitButtonEl);
    });

    expect(titleInputEl).toHaveDisplayValue('Title #1');
    expect(perexInputEl).toHaveDisplayValue('Perex detail');
    expect(contentInputEl).toHaveDisplayValue(
      'Very long content containing a lot of information... And more...'
    );

    expect(onSubmit).toBeCalledWith(
      {
        title: 'Title #1',
        perex: 'Perex detail',
        featuredImage: newFile,
        content:
          'Very long content containing a lot of information... And more...',
      },
      expect.any(Object)
    );
  });
});
