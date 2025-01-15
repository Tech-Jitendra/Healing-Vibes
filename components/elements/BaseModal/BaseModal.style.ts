import { createStyles } from '@mantine/core';
import {typography } from "@/themes/Mantine/typography";

export const createStyle = (
  langCode: "en" | "ar",
) => {

  return createStyles((theme) => ({
  PasswordInput: {
    // width:"370px",
    height: "44px",
    borderRadius: "34px",
    ...typography.paragraph[langCode].p2,
    color: theme.colors.gray[1]
  },
}))};