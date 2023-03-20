import { ComponentMeta } from '@storybook/react';

import Spinner from './';

export default {
  title: 'Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

export const Default = (args: Parameters<typeof Spinner>[0]) => (
  <Spinner {...args} />
);
Default.args = { size: 'sm' };

export const ExtraSmall = (args: Parameters<typeof Spinner>[0]) => (
  <Spinner {...args} />
);
ExtraSmall.args = { size: 'xs' };

export const Small = (args: Parameters<typeof Spinner>[0]) => (
  <Spinner {...args} />
);
Small.args = { size: 'sm' };

export const Medium = (args: Parameters<typeof Spinner>[0]) => (
  <Spinner {...args} />
);
Medium.args = { size: 'md' };
export const Large = (args: Parameters<typeof Spinner>[0]) => (
  <Spinner {...args} />
);
Large.args = { size: 'lg' };
export const ExtraLarge = (args: Parameters<typeof Spinner>[0]) => (
  <Spinner {...args} />
);
ExtraLarge.args = { size: 'xl' };
