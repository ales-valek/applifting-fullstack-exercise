import { ComponentMeta } from '@storybook/react';

import MdEditor from './';

export default {
  title: 'Form/Markdown Editor',
  component: MdEditor,
} as ComponentMeta<typeof MdEditor>;

export const Default = (args: Parameters<typeof MdEditor>[0]) => (
  <MdEditor {...args} />
);
Default.args = {
  value: '# Title',
};
