import { ComponentMeta } from '@storybook/react';

import Comment from './';

export default {
  title: 'Features/Blog/Comment',
  argTypes: {
    author: {
      description: "Comment' author",
    },
    postDate: {
      description: 'When was comment created',
    },
    content: {
      description: "Comment's content",
    },
    score: {
      description: 'Score count',
    },
    onVoteUp: {
      description: 'Function to run on vote up button click',
    },
    onVoteDown: {
      description: 'Function to run on vote down button click',
    },
  },
  component: Comment,
} as ComponentMeta<typeof Comment>;

export const Default = (args: Parameters<typeof Comment>[0]) => (
  <Comment {...args} />
);
Default.args = {
  author: 'Author name',
  content: 'Super long content for interesting article',
  postDate: '2 hours ago',
  score: 20,
  onVoteUp: () => {},
  onVoteDown: () => {},
};
