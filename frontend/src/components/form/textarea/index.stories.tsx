import { ComponentMeta } from '@storybook/react';

import Textarea from './';

export default {
  title: 'Form/Textarea',
  component: Textarea,
} as ComponentMeta<typeof Textarea>;

export const Default = (args: Parameters<typeof Textarea>[0]) => (
  <Textarea {...args} />
);
Default.args = {};
