import { Box, Input, TextInputProps, useMantineTheme } from '@mantine/core';

import { PolymorphicComponentProps } from '@mantine/utils';
import { IconSearch } from '@tabler/icons-react';
import { createStyle } from './SearchInput.style';

interface BaseSearchInput extends PolymorphicComponentProps<'input', TextInputProps> {
  placeholder?: string;
  click?: any;
  onChangeCallback?: any;
  search?: any;
}

export const SearchInput = (props: BaseSearchInput) => {
  const theme = useMantineTheme();
  const useStyles = createStyle();
  const { classes } = useStyles();

  return (
    <Input
      className={classes.mainBox}
      rightSection={
        <Box className={classes.searchIcon} onClick={props.click}>
          <IconSearch width={18} height={18} color={theme.colors.black[9]} />
        </Box>
      }
      placeholder={props.placeholder}
      classNames={{
        rightSection: classes.rightSection,
        input: classes.innerInput,
      }}
      radius="lg"
      {...props}
      value={props.search}
      onChange={props.onChangeCallback}
    />
  );
};
