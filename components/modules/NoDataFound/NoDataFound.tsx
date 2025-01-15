/* eslint-disable import/extensions */
import { Box, Flex, Image } from '@mantine/core';
import React from 'react';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { Images } from '@/public';
import { typography } from '@/themes/Mantine/typography';
import { useStores } from '@/models';

export default function NoDataFound() {
  const { i18nStore } = useStores();
  return (
    <Flex justify="center" h={350} wrap="wrap" align="center" gap={30}>
      <Image maw={354} src={Images.searchNoDataFound} />
      <Box>
        <BaseText
          style={typography.headings[i18nStore.getCurrentLanguage()].h4}
          txtkey="apparelCategories.SearchNofound"
        />
        <BaseText
          mt={15}
          style={typography.paragraph[i18nStore.getCurrentLanguage()].p1}
          txtkey="apparelCategories.tryAnother"
        />
      </Box>
    </Flex>
  );
}
