import { AddNumber } from './AddNumber';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AddNumber> = {
  title: 'signupFragment/AddNumber',
  component: AddNumber,
};

export default meta;
type Story = StoryObj<typeof AddNumber>;

export const addNumber: Story = {
  args: { },
};