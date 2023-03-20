import { ComponentMeta } from '@storybook/react';

import ButtonLink from './';

export default {
  title: 'ButtonLink',
  argTypes: {
    children: {
      description: 'Button content',
    },
    variant: {
      description: 'Button styling',
    },
    to: {
      description: 'Button URL link href',
    },
  },
  component: ButtonLink,
} as ComponentMeta<typeof ButtonLink>;

export const Default = (args: Parameters<typeof ButtonLink>[0]) => (
  <ButtonLink {...args} />
);
Default.args = {
  children: 'ButtonLink',
  to: '#',
  variant: 'primary',
};
