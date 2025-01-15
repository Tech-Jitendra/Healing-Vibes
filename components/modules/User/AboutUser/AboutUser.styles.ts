


import { createStyles } from '@mantine/core';
import { typography } from '../../../../themes/Mantine/typography';
import { useStores } from '@/models';

export const createStyle = () => {

    const { i18nStore } = useStores()

    return createStyles((theme) => ({
        boxWrapperFifteen: {
            border: "solid 2px white",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            position: "absolute",
            bottom: "-5px",
            cursor: "pointer",
            right: "20px ",
            // background: theme.colors.green
        },

        cardContainer: {
            marginTop: '35px',
            width: '350px',
            height: '328px',
            background: theme.colors.white,
            [theme.fn.smallerThan(("md"))]: {
                display: "none",
            }
        },

        links: {
            cursor: "pointer",
            textDecoration: "none",
        }
    }))

}