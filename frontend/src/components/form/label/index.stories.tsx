import { ComponentMeta } from '@storybook/react';

import Label from './';

export default {
  title: 'Form/Label',
  component: Label,
} as ComponentMeta<typeof Label>;

export const Default = (args: Parameters<typeof Label>[0]) => (
  <Label {...args} />
);
Default.args = {
  children: 'Label',
};
