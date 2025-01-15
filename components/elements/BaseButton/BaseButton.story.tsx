import React from 'react';
import { BaseButton } from './BaseButton';
import type { Meta, StoryObj } from '@storybook/react';
import { COLOR_VARIANTS, STYLE_VARIANTS } from './BaseButton.styles';

const meta: Meta<typeof BaseButton> = {
  title: 'Elements/Button',
  component: BaseButton,
  argTypes: {
    style_variant: {
      options:Object.keys( STYLE_VARIANTS),
      control: { type: 'select' },
    },
    color_variant: {
      options:Object.keys( COLOR_VARIANTS),
      control: { type: 'select' },
    },  
  },
};

export default meta;
type Story = StoryObj<typeof BaseButton>;

export const baseButton: Story = {
  args: {
    style_variant:STYLE_VARIANTS.filled as keyof typeof STYLE_VARIANTS,
    color_variant:COLOR_VARIANTS.blue  as keyof typeof COLOR_VARIANTS,
    children: "Button"
  },
};
