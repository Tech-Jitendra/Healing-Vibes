import { createStyles } from '@mantine/core';

export const createStyle = () => createStyles((theme) => ({
    container: {
        padding: '50px 110px',
        background: theme.colors.gray[9],
        margin: 'auto',
        [theme.fn.smallerThan('lg')]: {
            padding: '20px 70px',
        },
        [theme.fn.smallerThan('sm')]: {
            padding: '13px 35px',
        },
        
    },
    heroCommunityJoin:{
        justifyContent:'space-around',
        paddingTop: "20px",
        [theme.fn.smallerThan('sm')]: {
            gap: '3px',
        },
    }, 
    
})
)
export default createStyle;