import { ComponentMeta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import BlogImage from './';

const queryClient = new QueryClient();

export default {
  title: 'Features/Blog/Image',
  component: BlogImage,
  argTypes: {
    imageId: {
      description: 'Article image ID',
    },
    alt: {
      description: 'Image title',
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} as ComponentMeta<typeof BlogImage>;

export const Default = (args: Parameters<typeof BlogImage>[0]) => (
  <BlogImage {...args} />
);
Default.args = {
  imageId: '6ec2d066-89cc-4573-a663-d9516bb394ce',
  alt: 'Article Image',
};
