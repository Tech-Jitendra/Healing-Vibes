/* eslint-disable import/extensions */
import { createStyles } from '@mantine/core';
import { useStores } from '@/models';

export const createStyle = () => {
    const { i18nStore } = useStores();
    return createStyles((theme) => ({
        drawerBody: {
            marginTop: '40px ',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',

        },
        menuContentFlex: {
            height: '90vh',
            [theme.fn.smallerThan('md')]: {
                height: '80vh',
            },
        },
    }));
};
