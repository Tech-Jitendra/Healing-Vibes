import { createStyles, ButtonProps } from '@mantine/core';
import { PolymorphicComponentProps } from '@mantine/utils';
import { typography } from '@/themes/Mantine/typography';

export const STYLE_VARIANTS = {
  filled: 'filled',
  outline: 'outline',
  subtle: 'subtle',
  disabled: 'disabled',
};
//Color variant
export const COLOR_VARIANTS = {
  blue: 'blue',
  red: 'red',
  gray: 'gray',
  lime: 'lime',
};

type VariantMap = Record<keyof typeof STYLE_VARIANTS, React.CSSProperties>;
type ColorMap = Record<keyof typeof COLOR_VARIANTS, string>;

export interface BaseButtonProps extends PolymorphicComponentProps<'button', ButtonProps> {
  style_variant: keyof typeof STYLE_VARIANTS;
  color_variant: keyof typeof COLOR_VARIANTS;

}

export const createStyle = (langCode: 'en' | 'ar', props: BaseButtonProps) => createStyles((theme) => ({

  [STYLE_VARIANTS.filled]: {
    ...typography.buttonText[langCode].b2,
    background: theme.colors[props.color_variant][0],
    borderRadius: '11px',
    padding: '10px 24px',
  },
  [STYLE_VARIANTS.subtle]: {
    ...typography.buttonText[langCode].b4,
    background: theme.colors[props.color_variant],
    borderRadius: '11px',
    height: '40px',
  },
  [STYLE_VARIANTS.disabled]: {
    ...typography.buttonText[langCode].b2,
    background: theme.colors.gray[2],
    borderRadius: '44px',
    height: '40px',
  },
  [STYLE_VARIANTS.outline]: {
    ...typography.buttonText[langCode].b3,
    background: 'transparent',
    borderRadius: '42px',
    border: `1px solid ${theme.colors[props.color_variant]}`,
    height: '40px',
  },
}));
