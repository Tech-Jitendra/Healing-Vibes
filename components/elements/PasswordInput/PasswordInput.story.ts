/* eslint-disable import/extensions */
import { createStyles } from '@mantine/core';
import { typography } from '@/themes/Mantine/typography';
import { useStores } from '@/models';

export default {};
export const createStyle = () => {
  const { i18nStore } = useStores();
  return createStyles((theme) => ({
    passwordInput: {
      // width:"370px",
      height: '44px',
      borderRadius: '34px',
      ...typography.paragraph[i18nStore.getCurrentLanguage()].p2,
      color: theme.colors.gray[1],
    },
    rightSection: {
      right: i18nStore.isRTL ? '90%' : '',
    },
    innerInput: {
      textAlign: i18nStore.isRTL ? 'right' : 'left',
      padding: ' 0px 10px',
    },
  }));
};
