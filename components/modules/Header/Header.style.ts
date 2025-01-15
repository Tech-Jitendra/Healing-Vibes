/* eslint-disable import/extensions */
import { createStyles } from '@mantine/core';
import { useStores } from '@/models';

export const createStyle = () => {
  const { i18nStore } = useStores();

  return createStyles((theme) => ({
    containerBox: {
      height: '194px',
      background: theme.colors.white[1],
      boxShadow: '0px 4px 34px 0px rgba(196, 196, 196, 0.25)',
      padding: '30px 100px',
    },
    containerMobile: {
      height: '80px',
      padding: '20px 10px',
    },
    // container: {
    //   padding: '40px 0px 40px 200px',
    //   [theme.fn.smallerThan('sm')]: {
    //     padding: '2px',
    //     gap: '10px',
    //   },
    //   [theme.fn.smallerThan('xs')]: {
    //     display: 'hidden',
    //   },
    // },
    // search: {
    //   width: '353px',
    //   height: '38px',
    //   flexShrink: 0,
    //   borderRadius: '7px',
    //   border: '1px solid #EBEBEB',
    //   padding: '36px 438px 950px 649px',
    //   [theme.fn.smallerThan('sm')]: {
    //     display: 'hidden',
    //   },
    // },

    // mobileMenu: {
    //   justifyContent: 'space-between',
    //   height: '78px',
    //   width: '100%',
    //   padding: '0px 10px',
    //   alignItems: 'center',
    //   gap: '20px',
    //   [theme.fn.largerThan('xs')]: {
    //     display: 'none',
    //   },
    // },
    cursor: {
      cursor: 'pointer',
    },
    loginButton: {
      display: 'inline-flex',
      padding: '10px 24px',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
    },
    // subHeading: {
    //   width: '1040px',
    //   height: '57px',
    //   flexShrink: 0,
    //   borderRadius: '80px',
    //   background: '#F4F7F8',
    //   margin: 'auto',
    // },
    subHeadingText: {
      borderRadius: '80px',
      padding: '20px 40px',
      margin: '200px 0px',
    },
    navLinks: {
      display: 'inline-flex',
      padding: '10px 32px',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      transition: 'background-color 0.3s',
      background: theme.colors.gray[0],
      borderRadius: '80px',
      '&:hover': {
        background: theme.colors.gray[1],
      },
      color: theme.colors.black[3],
    },

  }));
};
