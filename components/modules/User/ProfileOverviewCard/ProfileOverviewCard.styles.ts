import { createStyles } from "@mantine/core";


export const createStyle = () => {


    return createStyles((theme) => ({
        container: {
            gap: "10px",
            background: theme.colors.white[1],
            padding: "15px",
        },
        commentBox: {
            padding: "4px 8px",
            margin: "10px",
            background: theme.colors.blue[1],
        }
    }))
}