import { createStyles } from '@mantine/core';

export const createStyle = () => createStyles((theme) => ({
    container: {
        padding: '70px 110px',
        background: theme.colors.gray[9],

        [theme.fn.smallerThan(('lg'))]: {
            padding: '22px 45px',
        },
        [theme.fn.smallerThan(('sm'))]: {
            padding: '16px 25px',
        },
        [theme.fn.smallerThan(('xs'))]: {
            padding: '8px 15px',
        },

    },
    badges: {
        padding: '10px 24px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        borderRadius: '11px',
        background: theme.colors.white,
        color: theme.colors.black[3],
        '&:hover': {
            background: theme.colors.gray[1],
        },
        [theme.fn.smallerThan(('md'))]: {
            background: theme.colors.cyan[5],
            padding: '5px 12px',
            borderRadius: '22px',
        },
    },
    card: {
        width: '792px',
        height: '227px',
        borderRadius: '16px',
        background: theme.colors.white[0],
        padding: '35px',
        [theme.fn.smallerThan(('md'))]: {
            padding: '16px',
            width: '100%',
            height: 'auto',
        },
    },
    forumIcons: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        background: theme.colors.gray[9],
        borderRadius: '64px',
        width: '83px',
        height: '32px',
        '&:hover': {
            background: theme.colors.gray[1],
            cursor: 'pointer',
        },
        [theme.fn.smallerThan(('xs'))]: {
            display: 'none',
        },
    },
    contentBox: {
        display: 'flex',
        gap: '10px',
        [theme.fn.smallerThan(('md'))]: {
            flexDirection: 'column',
            justifyContent: 'center',

        },
    },
    userInfo: {
        flex: '1',
    },
    icons: {
        // Styles for the icons section
        display: 'flex',
        alignItems: 'center',
    },

}));
export default createStyle;
