import { createStyles } from '@mantine/core';
import { typography } from '@/themes/Mantine/typography';
import { useStores } from '@/models';

export const createStyle = () => {
  const { i18nStore } = useStores();

  return createStyles((theme) => ({
    mainBox: {
      width: '353px',
      height: '38px',
      color: theme.colors.white,
      ...typography.paragraph[i18nStore.getCurrentLanguage()].p2,
    },

    rightSection: {
      left: '2px', // Adjust the left positioning to your preference
    },

    innerInput: {
      textAlign: i18nStore.isRTL ? 'right' : 'left',
      padding: i18nStore.isRTL ? '0px 40px 0px 16px' : '0px 40px 0px 40px',

    },

    searchIcon: {
      marginTop: '3px',
      cursor: 'pointer',
    },
  }));
};
