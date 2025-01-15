import { createStyles } from '@mantine/core';

export const createStyle = () => createStyles((theme) => ({
    container: {
        padding: '50px 110px',
        
        background: theme.colors.gray[9],
        margin: 'auto',
        [theme.fn.smallerThan('lg')]: {
            padding: '20px 70px',
        },
        [theme.fn.smallerThan('sm')]: {
            padding: '13px 35px',
        },
    },
    button_container: {
        display: 'inline-flex',
        padding: '10px 24px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        borderRadius: '11px',
        [theme.fn.smallerThan('sm')]: {
            padding: '3px 8px',
            borderRadius: '7px',
        },
        [theme.fn.smallerThan('xs')]: {
            fontSize: '12px',
            borderRadius: '10px',
        },
    },
    card_container: {
        width: '300px',
        height: '440px',
        borderRadius: '16px',
        background: theme.colors.white[0],
        [theme.fn.smallerThan('lg')]: {
            width: '330px',
            height: 'auto',
            borderRadius: '13px',
        },
        [theme.fn.smallerThan('sm')]: {
            width: '300px',
            height: 'auto',
        },
    },
    subBodyFlex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '40px',
        fontWeight: 700,
        marginBottom: '20px',
        [theme.fn.smallerThan('lg')]: {
            fontSize: '18px',
            padding: '20px 70px',
        },
        [theme.fn.smallerThan('xs')]: {
            gap: '5px',

        },

        [theme.fn.smallerThan('sm')]: {
            padding: '13px 35px',
        },
    },

    centerGridCard: {
        marginTop: '10px',
        [theme.fn.smallerThan('sm')]: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
        },
    },
}));

export default createStyle;
