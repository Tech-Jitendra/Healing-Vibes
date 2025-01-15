import { CircularIcon } from './CircularIcon';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CircularIcon> = {
  title: 'Elements/CircularIcon',
  component: CircularIcon,
  argTypes: {
    Icon: { control: { type: 'file', accept: '.png' } },
  },
};

export default meta;
type Story = StoryObj<typeof CircularIcon>;

export const circularIcon: Story = {
  args: {},
};