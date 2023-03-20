import { ComponentMeta } from '@storybook/react';

import Button from './';

export default {
  title: 'Button',
  argTypes: {
    children: {
      description: 'Button content',
    },
    variant: {
      description: 'Button styling',
    },
  },
  component: Button,
} as ComponentMeta<typeof Button>;

export const Default = (args: Parameters<typeof Button>[0]) => (
  <Button {...args} />
);
Default.args = {
  children: 'Button',
  variant: 'primary',
};
