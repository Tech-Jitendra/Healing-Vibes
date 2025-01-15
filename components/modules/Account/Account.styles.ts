import { createStyles } from '@mantine/core';
import { typography } from '../../../themes/Mantine/typography';
import { useStores } from '@/models';

export const createStyle = () => {

  const {i18nStore} =useStores()

return createStyles((theme) => ({
  container: {
    marginTop: '35px',
    background: theme.colors.white[1],
    border: `1px solid ${theme.colors.black[2]} `,
    padding: '40px 40px 30px 40px',
    borderRadius: '20px',
    [theme.fn.smallerThan('xs')]: {
      padding: '10px',
    },
  },
  mantineInputRightSection: {
    cursor: 'pointer',
    marginRight: '50px',
  },
  passwordInput: {
    borderRadius: '34px',
  },
  grid: {
    marginTop: '40px',
    [theme.fn.smallerThan('md')]: {
      marginTop: '20px',
    },
  },
  imageFlex: {
    display: 'flex',
    backgroundColor: theme.colors.gray[9],
    // backgroundColor: "red",
    borderRadius: '100px',
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      justifyContent: 'center',
    },
  },
  changeButton: {
    width: '125px',
    [theme.fn.smallerThan('xs')]: {
      width: '45%',
    },
  },
  imageUploadButton: {
    width: '125px',
    backgroundColor: theme.colors.blue[5],
    ...typography.buttonText.en.b2,
    borderRadius: '44px',
    '&:not([data-disabled]):hover': {
      background: theme.colors.blue[5],
      borderColor: 'none',
    },
    [theme.fn.smallerThan('xs')]: {
      width: '45%',
    },
  },
  rightSection: { 
    right: i18nStore.isRTL? "80%":""
  },
  input: {
    textAlign: i18nStore.isRTL? "right":"left",
    padding:" 0px 10px"
  }
}))}
