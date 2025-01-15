import {Account} from "./Account"
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Account> = {
  title: 'Page/Account',
  component: Account,
};

export default meta;
type Story = StoryObj<typeof Account>;

export const account: Story = {
  args: {},
};