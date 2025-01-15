import { BaseButton } from '@/components/elements/BaseButton/BaseButton';
import AboutCommunity from '@/components/modules/AboutCommunity/AboutCommunity';
import CommunityJoinFilter from '@/components/modules/CommunityJoinFilter/CommunityJoinFilter';
import CreatePost from '@/components/modules/CreateCommunityPost/CreatePost';
import Header from '@/components/modules/Header/Header';
import JoinNowBtn from '@/components/modules/JoinNowBtn';
import { Images } from '@/public';
import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconBell } from '@tabler/icons-react';
import React from 'react';
import { createStyle } from './Community_Join.style';

function CommunityJoin() {
  const useStyles = createStyle();
  const { classes } = useStyles();
  const theme = useMantineTheme();
  return (
    <>

      <Container maw={1250}>
        <Box className={classes.container}>
          {/* community header */}
          <Box>
            <Flex gap={20} align={'center'} justify={'space-between'}>
              <Image
                src={'/icons/communityCardimg.svg'}
                alt={'community'}
                height={100}
                width={100}
                radius="xl"
              />
              <Text>Specific community page </Text>

              {/**notification icon btn */}
              <Group spacing={10}>
                <JoinNowBtn />
                <Button variant="gradient" c="blue" mt={15} radius="xl">
                  <IconBell />
                </Button>
              </Group>
            </Flex>
          </Box>

          <Flex className={classes.heroCommunityJoin}>
            <Box w="600px">
              <CreatePost />
              <CommunityJoinFilter />
              <Text>Community post card</Text>
            </Box>
            <AboutCommunity />
          </Flex>
        </Box>
      </Container>
    </>
  );
}
export default CommunityJoin;
