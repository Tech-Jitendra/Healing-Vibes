import { createStyles } from '@mantine/core';
import {typography } from "@/themes/Mantine/typography";

export default createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 100,
    fontWeight: 900,
    letterSpacing: -2,
    ...typography.headings.en.h1,
    [theme.fn.smallerThan('md')]: {
      fontSize: 50,
    },
  },
}));
