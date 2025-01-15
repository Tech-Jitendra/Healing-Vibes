import { createStyles } from '@mantine/core';
import { Images } from '../../public/index';
// import {typography } from "@/themes/Mantine/typography";

export const createStyle = () => createStyles((theme) => ({
  container: {
    width: '100%',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    // padding:"100px",

    // backgroundImage: `url( ${Images.bg_Img}  )`,

    backgroundSize: '100%',
    [theme.fn.smallerThan('md')]: {
      padding: '20px 2px',
    },
  },
  link: {
    cursor: "pointer",
    textDecoration: "none"
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}))


export default createStyle; 