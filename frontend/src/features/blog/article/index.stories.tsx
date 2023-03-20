import { ComponentMeta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BlogImage from 'features/blog/image';

import Article from '.';

const queryClient = new QueryClient();

export default {
  title: 'Features/Blog/Article',
  component: Article,
  subcomponents: { BlogImage: BlogImage },
  argTypes: {
    articleUrl: {
      description: 'Link to article URL',
    },
    perex: {
      description: 'Perex of article',
    },
    title: {
      description: 'Title of article',
    },
    imgId: {
      description: "Article's image id",
    },
    postDate: {
      description: 'Article creation date and time',
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} as ComponentMeta<typeof Article>;

export const Default = (args: Parameters<typeof Article>[0]) => (
  <Article {...args} />
);
Default.args = {
  articleUrl: '#',
  perex: 'Lorem ipsum',
  title: 'Super article',
  imgId: '6ec2d066-89cc-4573-a663-d9516bb394ce',
  postDate: '18/7/5',
};
