import { createStyles } from '@mantine/core';
import { useStores } from '@/models';

export const createStyle = () => {
    const { i18nStore } = useStores()

    return createStyles((theme) => ({
        loader: {
            position: "absolute",
            margin: "auto",
            width: "20%",
            height: "20%"
        },
        rightSection: {
            right: i18nStore.isRTL ? "88%" : "",
        },
        input: {
            textAlign: i18nStore.isRTL ? "right" : "left",
            padding: " 0px 10px"
        },
        loaderBox: {
            position: 'fixed',
            zIndex: 1,
            left: 0,
            top: 0,
            width: '100%',
            height: '100vh',
            overflow: 'auto',
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }
    }))
}