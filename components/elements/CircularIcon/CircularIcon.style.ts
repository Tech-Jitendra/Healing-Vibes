import { createStyles } from '@mantine/core';
import {typography } from "@/themes/Mantine/typography";

export const createStyle = (
) => {
  return createStyles((theme) => ({
  container: {
    width:"44px",
    height: "44px",
    borderRadius: "100%",
    background: theme.colors.dark[0],
    display: "flex",
    justifyContent: "center" ,
    alignItems : "center"
  },
}))};