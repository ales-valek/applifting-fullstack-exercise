import { ComponentMeta } from '@storybook/react';

import Pagination from './';

export default {
  title: 'Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

export const Default = (args: Parameters<typeof Pagination>[0]) => (
  <Pagination {...args} />
);
Default.args = {
  current: 2,
  total: 6,
  onPageChange: () => {},
};
