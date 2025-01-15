import { EmailOtp } from './EmailOtp';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof EmailOtp> = {
  title: 'signupFragment/EmailOtp',
  component: EmailOtp,
};

export default meta;
type Story = StoryObj<typeof EmailOtp>;

export const emailOtp: Story = {
  args: { },
};