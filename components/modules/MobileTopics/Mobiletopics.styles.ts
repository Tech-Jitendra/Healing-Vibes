import { createStyles } from '@mantine/core';

export const createStyle = () => createStyles((theme) => ({
    container: {
        width: '90vw',
        height: 'auto',
        padding: '0px 42px',
        flexFlow: 'column wrap',
        gap: '10px',
        borderRadius: '18px',
    },
    btn: {
        borderRadius: '10px',
        padding: '5px 10px',
        margin: '2px',
        background: theme.colors.teal[4],
    },

}));
