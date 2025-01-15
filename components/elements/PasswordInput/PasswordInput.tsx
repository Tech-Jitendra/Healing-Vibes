import React, { SetStateAction } from 'react';
import { PasswordInput, PasswordInputProps } from '@mantine/core';
import { PolymorphicComponentProps } from '@mantine/utils';
import { createStyle } from './PasswordInput.style';
import { useStores } from '@/models';

interface BaseSearchInput extends PolymorphicComponentProps<'input', PasswordInputProps> {
  placeholder?: string;
  onChange?: any,
  inputvalue? : any
}

export const BasePasswordInput = (
  props: BaseSearchInput
) => {
  const useStyles = createStyle();
  const { classes } = useStyles();
  const { i18nStore } = useStores();

  return (
    <PasswordInput
      {...props}
      className={classes.passwordInput}
      classNames={{
        rightSection: classes.rightSection,
        innerInput: classes.innerInput,
      }}
      placeholder={props.placeholder}
      autoComplete="on"
      radius="xl"
      {...props.inputvalue}
    />
  );
};
