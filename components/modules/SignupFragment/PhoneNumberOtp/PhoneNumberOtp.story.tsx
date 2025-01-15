import { PhoneNumberOtp } from './PhoneNumberOtp';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PhoneNumberOtp> = {
  title: 'signupFragment/PhoneNumberOtp',
  component: PhoneNumberOtp,
};

export default meta;
type Story = StoryObj<typeof PhoneNumberOtp>;

export const phoneNumberOtp: Story = {
  args: { },
};