import React from 'react';
import { Box, Image } from '@mantine/core';
import { Images } from '../../../public/index';
import { createStyle } from './CircularIcon.style';

interface circularIconProps {
  icon?: string;
}

export const CircularIcon = (props: circularIconProps) => {
  const useStyles = createStyle();
  const { classes } = useStyles();


  return (
    <>
      <Box className={classes.container} {...props}>
        <Image
          src={props.icon ? props.icon : Images.facebook_icon}
          width={20}
          height={20}
          alt="Icon"
        />
      </Box>
    </>
  );
};
