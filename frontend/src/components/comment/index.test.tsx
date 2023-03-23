import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Comment from './';

describe('Comment', () => {
  it('Should render correctly', () => {
    const onVoteUp = jest.fn();
    const onVoteDown = jest.fn();

    render(
      <Comment
        author="Author name"
        content="Super long content for interesting article"
        postDate="2 hours ago"
        score={20}
        onVoteUp={onVoteUp}
        onVoteDown={onVoteDown}
      />
    );

    screen.getByText('Author name');
    screen.getByText('Super long content for interesting article');
    screen.getByText('2 hours ago');
    screen.getByText('+20');
    userEvent.click(screen.getByLabelText('vote-up'));
    userEvent.click(screen.getByLabelText('vote-down'));

    expect(onVoteUp).toBeCalledTimes(1);
    expect(onVoteDown).toBeCalledTimes(1);
  });
});
