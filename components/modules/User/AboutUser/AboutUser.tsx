import { useStores } from '@/models';
import { Images } from '@/public';
import {
  Card,
  Avatar,
  Group,
  Button,
  Indicator,
  Paper,
  Box,
  Flex,
  Badge,
  FileButton,
  Image,
  Text,
} from '@mantine/core';
import {
  IconCamera,
  IconCameraPlus,
  IconChevronCompactRight,
  IconChevronRight,
  IconCircuitPushbutton,
  IconPlus,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { createStyle } from './AboutUser.styles';

const AboutUser = () => {
  const { userStore } = useStores();
  const useStyles = createStyle();
  const { classes } = useStyles();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  //   console.log('router,query', router.query.user[0]);
  return (
    <Card withBorder radius="md" p="md" className={classes.cardContainer}>
      <Card.Section
        h={120}
        style={{
          backgroundImage:
            'url(https://media.istockphoto.com/id/1473969678/photo/digital-image-of-light-rays-stripes-lines-with-green-light-abstract-speed-and-motion-in-green.jpg?s=1024x1024&w=is&k=20&c=aX912ARAVBPEySckLFgLdEAyR_1qJ6gxCDpj-HN1zQQ=)',
        }}
      />

      <Flex align={'center'} justify={'space-between'}>
        <FileButton onChange={setFile} accept="image/png,image/jpeg">
          {(props) => (
            <Flex pos="relative" w="120px" mt={-50}>
              {!file ? (
                <IconUser
                  radius={'50%'}
                  // src={`./../${Images.user_icon}`}
                  width={'60px'}
                  height={'60px'}
                />
              ) : (
                <Image
                  radius={'50%'}
                  src={URL.createObjectURL(file)}
                  width={'120px'}
                  height={'120px'}
                  alt="selected_image"
                />
              )}
              <Box {...props} className={classes.boxWrapperFifteen}>
                {!file ? (
                  <IconCameraPlus width={'25px'} height={'25px'} />
                ) : (
                  <IconCameraPlus width={'25px'} height={'25px'} />
                )}
              </Box>
            </Flex>
          )}
        </FileButton>
        <Box mt={10} className={classes.links}>
          <IconSettings
            width={'28px'}
            height={'28px'}
            onClick={() => {
              router.push('/settings');
            }}
          />
        </Box>
      </Flex>
      {router.query.user && router.query.user[0] ? <Text>{router.query.user[0]}</Text> : <></>}

      {/* create avatar button */}
      <Button
        fullWidth
        radius="xl"
        mt="xs"
        size="md"
        variant="gradient"
        gradient={{ from: 'teal', to: 'lime', deg: 60 }}
        rightIcon={<IconChevronRight />}
      >
        Create Avatar
      </Button>
      {/* new Post button */}
      <Button
        fullWidth
        radius="xl"
        mt="xs"
        size="md"
        variant="gradient"
        onClick={() => {
          router.push(`/post?username=${userStore.loggedInUserData?.user.full_name}`);
        }}
      >
        New Post
      </Button>
    </Card>
  );
};

export default AboutUser;
