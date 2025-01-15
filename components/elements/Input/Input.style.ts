import { createStyles } from '@mantine/core';
import { typography } from "@/themes/Mantine/typography";
import { TextInputProps } from '@mantine/core';
import { PolymorphicComponentProps } from "@mantine/utils";
import { useStores } from '@/models';

export const STYLE_VARIANTS = {
  inputText1: "inputText1",
  inputText2: "inputText2",
};
type VariantMap = Record<keyof typeof STYLE_VARIANTS, string>;

export interface BaseTextInputProps extends PolymorphicComponentProps<'TextInput', TextInputProps> {
  style_variant: keyof typeof STYLE_VARIANTS;
  placeholder?: string ,
  inputvalue? : any
}

export const createStyle = (
  props: BaseTextInputProps
) => {

  const { i18nStore } = useStores();

  return createStyles((theme) => ({
    [STYLE_VARIANTS.inputText1]: {
      ...typography.inputFieldText[i18nStore.getCurrentLanguage()].i1,
      borderRadius: '34px',
    },
    [STYLE_VARIANTS.inputText2]: {
      ...typography.inputFieldText[i18nStore.getCurrentLanguage()].i2,
      borderRadius: '34px'
    },
    rightSection: {
      right: i18nStore.isRTL ? "1%" : ""
    },
    icon: {
      right: i18nStore.isRTL ? "1%" : ""
    },
    innerInput: {
      textAlign: i18nStore.isRTL ? "right" : "left",
      padding: " 0px 10px"
    }
  }
  ))
}