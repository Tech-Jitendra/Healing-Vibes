/* eslint-disable import/extensions */
import { createStyles } from '@mantine/core';
import { useStores } from '@/models';

export const createStyle = () => {
    const { i18nStore } = useStores();

    return createStyles((theme) => ({
        cardContainer: {
            width: '350px',
            height: '280px',
            background: theme.colors.white,
        },


    }));
};
