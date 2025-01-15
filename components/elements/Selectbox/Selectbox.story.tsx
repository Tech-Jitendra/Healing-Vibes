import { Selectbox } from './Selectbox';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Selectbox> = {
  title: 'Elements/Selectbox',
  component: Selectbox,
};

export default meta;
type Story = StoryObj<typeof Selectbox>;

export const selectbox: Story = {
  args: {
    data:['React','Vue' ,'Angular' ,'Svelte']
  },
};