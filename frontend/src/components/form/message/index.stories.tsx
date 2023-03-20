import { ComponentMeta } from '@storybook/react';

import Message from './';

export default {
  title: 'Form/Message',
  component: Message,
} as ComponentMeta<typeof Message>;

export const Default = (args: Parameters<typeof Message>[0]) => (
  <Message {...args} />
);
Default.args = {
  children: 'Message',
  variant: 'info',
};
