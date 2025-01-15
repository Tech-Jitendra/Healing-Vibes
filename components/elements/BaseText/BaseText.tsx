import React from 'react';
import { Text, TextProps } from '@mantine/core';
import { PolymorphicComponentProps } from '@mantine/utils';
import { translate, TxKeyPath } from '../../../i18n';

export const SIZE_VARIANTS = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
};
//Color variant
export const FONTWEIGHT_VARIANTS = {
  400: 400,
  500: 500,
  600: 600,
  700: 700,
};
type fontWeightMap = Record<keyof typeof SIZE_VARIANTS, string>;
type sizeMap = Record<keyof typeof FONTWEIGHT_VARIANTS, number>;

interface BaseTextProps extends PolymorphicComponentProps<'div', TextProps> {
  // size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  size_variant?: keyof typeof SIZE_VARIANTS;
  fontWeight_variant?: keyof typeof FONTWEIGHT_VARIANTS;
  color?: string;
  // fontWeight?: 400 | 500 | 600 | 700;
  txtkey?: TxKeyPath;
  [x: string | number | symbol]: unknown;
}

export const BaseText = (props: BaseTextProps) => (
  <Text fz={props.size_variant} fw={props.fontWeight_variant} c={props.color} {...props}>
    {props.txtkey ? translate(props.txtkey) : props.children}
  </Text>
);
