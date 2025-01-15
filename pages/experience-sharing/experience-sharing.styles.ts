import { createStyles } from '@mantine/core';

export const createStyle = () => createStyles((theme) => ({
    container: {
        padding: '80px 110px',
        margin: 'auto',
        background: theme.colors.gray[9],
        [theme.fn.smallerThan('md')]: {
            padding: '35px 40px',
        },

    },
    cardContainer: {
        width: '100%',
        height: '250px',
        borderRadius: '20px',
        background: theme.colors.white[0],
        [theme.fn.smallerThan('md')]: {
            width: '100%',
            height: 'auto',
        },
        [theme.fn.smallerThan('sm')]: {
            width: '100%',
            height: 'auto',
        },
        [theme.fn.smallerThan('xs')]: {
            padding: '5px 10px',
        },
    },
    cardHead: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    forumIcons: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        padding: '8px 16px',
        background: theme.colors.gray[9],
        borderRadius: '64px',
        width: '120px',
        height: '32px',
        '&:hover': {
            background: theme.colors.gray[1],
            cursor: 'pointer',
        },
        [theme.fn.smallerThan(('xs'))]: {
            padding: '4px 8px',
            gap: '3px',
            width: '50%',
        },
    },
    Icons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '24px',
        gap: '8px',
        [theme.fn.smallerThan('xs')]: {
            marginTop: '12px',
            flexDirection: 'column',
            justifyContent: 'center',

        },
    },
    cardContent: {
        padding: '2px 70px',
        [theme.fn.smallerThan(('sm'))]: {
            padding: '20px 5px',
            fontSize: '11px',
        },

    },
    title: {
        fontFamily: 'Lato',
        fontWeight: 600,
        fontSize: '20px',
        [theme.fn.smallerThan(('xs'))]: {
            fontSize: '12px',
        },
    },
    content: {
        [theme.fn.smallerThan(('sm'))]: {
            fontSize: '10px',
        },
    },
    headingFlex: {
        fontSize: '40px',
        [theme.fn.smallerThan('md')]: {
            fontSize: '20px',
        },
    },
    pgeSearchBox: {
        marginTop: '40px',
        marginBottom: '20px',
        [theme.fn.smallerThan('sm')]: {
            marginTop: '15px',
            marginBottom: '5px',
        },
    },

}));

export default createStyle;
