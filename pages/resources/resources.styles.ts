import { createStyles } from '@mantine/core';


export const createStyle = () => createStyles((theme) => ({
    Header: {
        width: '100%',
        height: '72px',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.white[1],
        boxShadow: '0px 8px 24px 0px rgba(0, 0, 0, 0.10)',
    },
    NavItems: {
        width: '551px',
        height: '39px',
    },
    HeroSection: {
        width: '100%',
        height: '900px',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#F5A05C',

    },
    btn: {
        width: '198px',
        height: '60px',
        background: '#01847F',
        borderRadius: '8px',
        padding: '9px 36px',
    },
    HeroText: {
        padding: '240px 120px',
    },
    // HeroImgBackGround: {
    //     width: '500px',
    //     height: '500px',
    //     transform: 'rotate(-5.465deg)',
    //     flexShrink: 0,
    //     background: '#44A1A0',
    // },
    // HeroImgBackGround: {
    //     transform: 'rotate(-5.465deg)',
    //     flexShrink: 0,
    //     background: '#44A1A0',
    //     position: 'absolute',
    //     objectFit: 'cover',
    //     height: '500px',
    //     width: '500px',
    //     // You can adjust objectFit as needed
    //     // You can keep your other styles here
    // },

    // HeroSvg: {
    //     postion: 'absolute',
    //     top: '-258px',
    //     left: '393px',
    //     zIndex: -10,
    //     display: 'inline-flex',
    // },
    // HeroImage: {
    //     position: 'absolute',
    //     transform: 'rotate(5.465deg)',
    //     height:"200px",
    //     width:"200px",
    //     // display: 'inline-flex',
    //     // You can adjust objectFit as needed
    //     zIndex: 2, // Ensure the image is on top of the background
    //     // You can keep your other styles here
    // },
    WeirdBox: {
        zIndex: 1,
        // display: 'inline-flex',
        justifyContent: 'space=between',
        alignItems: 'center',
        postion: 'relative',

    },
    rightSide: {
        // backgroundImage: URL('C:/Users/vdnhb/Downloads/BG Shape@2x.png'),
        backgroundImage: `url("./image/BG Shape@2x.png")`,
    },

}));

export default createStyle;
