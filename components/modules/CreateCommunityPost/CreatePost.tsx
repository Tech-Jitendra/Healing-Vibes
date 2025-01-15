import { Input } from '@/components/elements/Input/Input';
import { Images } from '@/public';
import { ClassNames } from '@emotion/react';
import {
  Avatar,
  Badge,
  Button,
  Container,
  Flex,
  Indicator,
  InputBase,
  useMantineTheme,
} from '@mantine/core';
import { IconFileImport, IconLink, IconUpload } from '@tabler/icons-react';
import React from 'react';
import { createStyle } from './CreatePost.style';

const CreatePost = () => {
  const theme = useMantineTheme();
  const useStyles = createStyle();
  const { classes } = useStyles();
  console.log(typeof Images.userProfileImage);
  return (
    <>
      <Container className={classes.inputContainer} p="md">
        <Flex gap={20} align={'center'}>
          {/* user avatar create post */}
          <Indicator size={16} offset={7} position="bottom-end" color={theme.colors.green[0]} processing>
            <Avatar
              size={60}
              radius="50%"
              src={Images.userProfileImage}
              alt={'user avatar'}
              // style={{ border: `2px solid ${isOnline ? "green" : "gray" }` }}
            />
          </Indicator>

          <InputBase w={'100%'} placeholder="Create Post" radius={'md'} />
          <Button variant="default" aria-label="Create Media Post" sx={{ border: 'none' }}>
            {' '}
            <IconFileImport />
          </Button>
          <Button variant="default" aria-label="Add Link" sx={{ border: 'none' }}>
            {' '}
            <IconLink />
          </Button>
        </Flex>
      </Container>
    </>
  );
};

export default CreatePost;
