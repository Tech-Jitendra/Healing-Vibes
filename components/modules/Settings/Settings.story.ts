import {Settings} from "./Settings"
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Settings> = {
  title: 'Page/Address',
  component: Settings,
};

export default meta;
type Story = StoryObj<typeof Settings>;

export const account: Story = {
  args: {},
};