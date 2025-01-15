import { createStyles } from '@mantine/core';
import {typography } from "@/themes/Mantine/typography";

export const createStyle = (
  langCode: "en" | "ar",
) => {

  return createStyles((theme) => ({
      mainBox: {
       background:theme.colors.gray[2],
      //  width:"320px",
       border : 'none',
       borderRadius: '34px',
       ...typography.inputFieldText[langCode].i2,
       color: theme.colors.gray[6]
      },
    }
))}