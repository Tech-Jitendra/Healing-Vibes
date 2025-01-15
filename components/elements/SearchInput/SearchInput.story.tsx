import { SearchInput } from './SearchInput';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SearchInput> = {
  title: 'Elements/SearchInput',
  component: SearchInput,
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const input: Story = {
  args: {
    placeholder :'your email'
  },
};