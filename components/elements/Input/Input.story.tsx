import { Input } from './Input';
import type { Meta, StoryObj } from '@storybook/react';
import { STYLE_VARIANTS } from './Input.style';


const meta: Meta<typeof Input> = {
  title: 'Elements/Input',
  component: Input,
  argTypes: {
    style_variant: {
      options:Object.keys( STYLE_VARIANTS),
      control: { type: 'select' },
    },
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const input: Story = {
  args: {
    style_variant:STYLE_VARIANTS.inputText1 as keyof typeof STYLE_VARIANTS,
    placeholder: "Input"
  },
};
