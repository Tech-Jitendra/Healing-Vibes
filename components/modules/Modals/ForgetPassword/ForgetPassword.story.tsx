/* eslint-disable import/extensions */
import type { Meta, StoryObj } from '@storybook/react';
import { ForgotPassword } from './ForgetPassword';

const meta: Meta<typeof ForgotPassword> = {
  title: 'Page/ForgotPassword',
  component: ForgotPassword,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ForgotPassword>;

export const forgotPassword: Story = {
  args: {},
};
