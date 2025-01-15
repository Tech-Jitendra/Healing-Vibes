import React from 'react';
import { BaseText } from './BaseText';
import type { Meta, StoryObj } from '@storybook/react';
import { SIZE_VARIANTS, FONTWEIGHT_VARIANTS } from './BaseText';


const meta: Meta<typeof BaseText> = {
  title: 'Elements/Text',
  component: BaseText,
  argTypes: {
    size_variant: {
      options:Object.keys( SIZE_VARIANTS),
      control: { type: 'select' },
    },
    fontWeight_variant: {
      options:Object.keys( FONTWEIGHT_VARIANTS),
      control: { type: 'select' },
    },  
  },
};

export default meta;
type Story = StoryObj<typeof BaseText>;

export const baseText: Story = {
  args: {
    size_variant:SIZE_VARIANTS.md as keyof typeof SIZE_VARIANTS,
    fontWeight_variant:FONTWEIGHT_VARIANTS[500]  as keyof typeof FONTWEIGHT_VARIANTS,
    children: 'Text',
  },
};
