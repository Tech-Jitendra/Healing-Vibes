import { createStyles } from "@mantine/core";


export const createStyle = () => {


    return createStyles((theme) => ({
        container: {
            gap: "10px",
            background: theme.colors.white[1],
            padding: "15px",
            "&:hover":{
                border:"1px solid grey",
                cursor: "pointer", 
            }
        },
    }))
}