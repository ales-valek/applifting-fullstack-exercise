import { ComponentMeta } from '@storybook/react';

import Input from '.';

export default {
  title: 'Form/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

export const Default = (args: Parameters<typeof Input>[0]) => (
  <Input {...args} />
);
Default.args = {};
