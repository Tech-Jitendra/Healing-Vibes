/* eslint-disable import/extensions */
import { createStyles } from '@mantine/core';
import { useStores } from '@/models';

export const createStyle = () => {
    const { i18nStore } = useStores();

    return createStyles((theme) => ({
        filterContainer: {
            background: theme.colors.white[0],
            borderRadius: '4px',
            display: 'flex',
            justifyContent: "flex-start",
            flexFlow: 'row nowrap',
            marginBottom: '16px',
            padding: '10px 12px',
          

        },
        btns:{
            ['& hover']:{
                background: theme.colors.gray[9],
                border:'none',
            }
        }


    }));
};
