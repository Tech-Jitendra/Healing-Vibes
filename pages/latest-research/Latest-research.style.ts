import { createStyles } from '@mantine/core';

export const createStyle = () => createStyles((theme) => ({

    container: {
        padding: '50px 110px',
        background: theme.colors.gray[9],
        [theme.fn.smallerThan('lg')]: {
            padding: '25px 25px',

        },
    },
    heading: {
        fontWeight: 700,
        fontSize: '40px',
        [theme.fn.smallerThan('lg')]: { fontSize: '25px' },
        [theme.fn.smallerThan('md')]: {
            textAlign: 'center',
        },

    },
    mainItems: {
        gap: '32px',
        [theme.fn.smallerThan('md')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
    },

}));
export default createStyle;
