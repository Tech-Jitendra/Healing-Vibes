import {Address} from "./Address"
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Address> = {
  title: 'Page/Address',
  component: Address,
};

export default meta;
type Story = StoryObj<typeof Address>;

export const account: Story = {
  args: {},
};