import { createStyles } from '@mantine/core';

export const createStyle = () => createStyles((theme) => ({
  indicator: {
    width: 'rem(12px)',
    height: 'rem(4px)',
    transition: 'width 250ms ease',

    '&[data-active]': {
      background: theme.colors.blue,
    },
  },
  control: {
    width: '10px',
    height: '10px',
    margin: '-30px -50px 50px -50px',
    [theme.fn.smallerThan('xs')]: {
      margin: '-30px -40px 30px -40px',
    },
  },
  crouselSlide: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideBox: {
    background: theme.colors.red,
    padding: '20px 52px',
    width: '100%',
    height: '88%',
    borderRadius: '28px',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    [theme.fn.smallerThan('md')]: {
      padding: '15px',
    },
    [theme.fn.smallerThan('sm')]: {
      padding: '10px',
    },
  },
  button: {
    borderRadius: '20px',
    marginTop: '20px',
    width: '139px',
    backgroundColor: theme.white,
    [theme.fn.smallerThan('sm')]: {
      marginTop: '5px',
    },
    '&:not([data-disabled]):hover': {
      background: theme.white,
      borderColor: 'none',
    },
  },
  carousel_image: {
    height: '150px',
    width: '122px',
    flexShrink: 0,
    borderRadius: '16px',
    backgroundRepeat: 'no-repeat',
    objectFit: 'cover',
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
    textAlign: 'center',
  },
  testimonialCard: {
    width: '500px',
    height: '214px',
    borderRadius: '32px',
    background: theme.colors.green[1],
    boxShadow: '20px 14px 40px 0px rgba(0, 0, 0, 0.07)',
    display: 'flex',
    align: 'center',
    justifyContent: 'center',
    padding: '32px',
    gap: '40px',

  },
  carousel_text: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    [theme.fn.smallerThan('xs')]: {
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },

  },
  carousel_textFlex: {
    fontSize: '24px',
    [theme.fn.smallerThan('xs')]: {
      fontSize: '20px',
    },
  },
  controls: {
    transition: 'opacity 150ms ease',
    opacity: 0,
  },

  root: {
    '&:not([data-disabled]):hover': {
      controls: {
        opacity: 1,
      },
    },
  },
  customIndicators: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px', /* Adjust the margin as needed */
    backgroundColor: theme.colors.red[3],
  },
}));
