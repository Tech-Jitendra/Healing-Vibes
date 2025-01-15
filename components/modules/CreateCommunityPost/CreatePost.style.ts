/* eslint-disable import/extensions */
import { createStyles } from '@mantine/core';
import { useStores } from '@/models';

export const createStyle = () => {
    const { i18nStore } = useStores();

    return createStyles((theme) => ({
        inputContainer: {
            background: theme.colors.white[0],
        },


    }));
};
