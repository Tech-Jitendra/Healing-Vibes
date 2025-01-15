import { createStyles } from '@mantine/core';

export const createStyle = () => createStyles((theme) => ({
    container: {
        width: '792px',
        height: '221px',
        borderRadius: '16px',
        background: theme.colors.white[0],
        marginTop: '8px',
        marginBottom: 'auto',
        padding: '35px 32px',
        [theme.fn.smallerThan('md')]: {
            width: '391px',
            height: 'auto',
            padding: '15px',
        },
        [theme.fn.smallerThan('xs')]: {
            width: '290px',
            height: 'auto',
            padding: '10px',
        },
    },
    userPostedButton: {
        borderRadius: '64px',
        background: theme.colors.gray[9],
        color: '#595959',
        marginTop: '24px ',
    },
    datePostedtext: {
        borderRadius: '64px',
        background: theme.colors.gray[9],
        color: '#595959',
        width: '125px',
        height: '32px',
        marginTop: '24px ',
    },
    detailBtns: {
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.fn.smallerThan('xs')]: {
            justifyContent: 'center',
            alignItems:'center',
        },
    },
    btnGroup: {
        gap: '13px',
    },
}));
