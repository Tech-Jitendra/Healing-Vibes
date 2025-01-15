import { createStyles } from '@mantine/core';

export const createStyle = () => createStyles((theme) => ({
    badges: {
        padding: '10px 24px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        borderRadius: '13px',
        color: theme.colors.black[3],
    },
}));
