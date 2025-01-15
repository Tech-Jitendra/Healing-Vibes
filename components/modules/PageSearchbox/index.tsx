/* eslint-disable import/extensions */
import { Flex, useMantineTheme } from '@mantine/core';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { SearchInput } from '@/components/elements/SearchInput/SearchInput';
import { createStyle } from './PageSearch.style';

interface PageSearchBoxProps {
  num?: number;
  type?: string;
  searchText?: string;
  onSearchChange?: Function;
}

export default function PageSearchBox({
  num,
  type,
  searchText,
  onSearchChange,
}: PageSearchBoxProps) {
  const theme = useMantineTheme();
  const useStyles = createStyle();
  const { classes } = useStyles();

  return (
    <Flex
      justify="space-between"
      align="center"
      wrap="wrap"
      className={classes.searchInputContainer}
    >
      {/* // <Container className={classes.searchInputContainer}> */}
      <BaseText color_variant={theme.colors.black[9]} fontWeight_variant={700} size_variant="lg">
        {num} {type}
      </BaseText>
      <SearchInput search={searchText} onChangeCallback={onSearchChange} />
      {/* // </Container> */}
    </Flex>
  );
}
