/* eslint-disable no-useless-concat */
/* eslint-disable import/extensions */
import { createStyles } from '@mantine/core';
import { Images } from '../../public/index';
import { useStores } from '@/models';

export const createStyle = () => {
  const { i18nStore } = useStores();

  return createStyles((theme) => ({
    container: {
      width: '100%',
      height: '100vh',
      alignItems: 'center',
      // backgroundImage: 'url( ' + `${Images.bg_Img}` + '  )',
      backgroundSize: '100%',
      [theme.fn.smallerThan('md')]: {
        padding: '20px 2px',
      },
    },
    link: {
      cursor: 'pointer',
      textDecoration: 'none',
    },
    rightSection: {
      right: i18nStore.isRTL ? '88%' : '',
    },
  facebookIconBox: {
    width: '40px',
    height: '40px',
    borderRadius: '100%',
    border: `1px solid ${theme.colors.gray[4]}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '&:not([data-disabled]):hover': {
      background: theme.colors.gray[0],
    },
  },
  input: {
      textAlign: i18nStore.isRTL ? 'right' : 'left',
      padding: ' 0px 10px',
    },
    loaderBox: {
      position: 'fixed',
      zIndex: 1,
      left: 0,
      top: 0,
      width: '100%',
      height: '100vh',
      overflow: 'auto',
      backgroundColor: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
}));
};
export default createStyle;
