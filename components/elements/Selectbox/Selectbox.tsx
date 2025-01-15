import React from 'react';
import { Select } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { createStyle } from './Selectbox.style';

interface BaseSelectboxProps {
  data: any;
}

export const Selectbox = (props: BaseSelectboxProps) => {
  const useStyles = createStyle('en');
  const { classes } = useStyles();

  return (
    <Select
      className={classes.mainBox}
      rightSection={<IconChevronDown size="1rem" />}
      placeholder="Select"
      variant="filled"
      radius="xl"
      {...props}
    />
  );
};
