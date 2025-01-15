import { SignupForm } from './SignupForm'
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SignupForm> = {
  title: 'signupFragment/SignupForm',
  component: SignupForm,
};

export default meta;
type Story = StoryObj<typeof SignupForm>;

export const signupForm: Story = {
  args: {},
};