import { ComponentMeta } from '@storybook/react';

import Dropdown from './';

export default {
  title: 'Dropdown',
  component: Dropdown,
  subcomponents: {
    'Dropdown.Button': Dropdown.Button,
    'Dropdown.Menu': Dropdown.Menu,
  },
} as ComponentMeta<typeof Dropdown>;

export const Default = (args: Parameters<typeof Dropdown>[0]) => (
  <Dropdown {...args} />
);
Default.args = {
  children: (
    <>
      <Dropdown.Button>Open Dropdown</Dropdown.Button>
      <Dropdown.Menu>Menu</Dropdown.Menu>
    </>
  ),
};
