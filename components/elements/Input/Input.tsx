import React from 'react';
import { TextInput } from '@mantine/core';
import { createStyle } from './Input.style';
import { BaseTextInputProps } from './Input.style';


export const Input = (props: BaseTextInputProps) => {
  const useStyles = createStyle(props);
  const { classes } = useStyles();

  return (
    <TextInput
      {...props}
      className={classes[props.style_variant]}
      classNames={{
        icon: classes.icon,
        input: classes.innerInput
      }}
      placeholder={props.placeholder}
      radius="xl"
      {...props.inputvalue}
    />
  );
};
