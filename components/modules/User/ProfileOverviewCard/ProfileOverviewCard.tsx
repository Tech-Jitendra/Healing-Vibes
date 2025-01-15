import { useStores } from '@/models';
import {
  Box,
  Flex,
  Group,
  useMantineTheme,
  Text,
  Divider,
  Stack,
  Menu,
  ActionIcon,
  Button,
} from '@mantine/core';
import {
  IconDots,
  IconDownload,
  IconDropletDown,
  IconMessage,
  IconPencil,
} from '@tabler/icons-react';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import React from 'react';
import { createStyle } from './ProfileOverviewCard.styles';

const ProfileOverviewCard = () => {
  const theme = useMantineTheme();
  const router = useRouter();
  const { userStore } = useStores();
  const commentData = [
    {
      id: 1,
      user: userStore.loggedInUserData?.user.full_name,
      post_title: '10 words from the post title ',
      comm_name: 'community of the post form the store',
      comment: 'comment from user',
      posted_by: 'post author',
      post_time: '2 hrs ago',
    },
    {
      id: 1,
      user: userStore.loggedInUserData?.user.full_name,
      post_title: '10 words from the post title ',
      comm_name: 'community of the post form the store',
      comment: 'comment from user',
      post_time: '2 hrs ago',
      posted_by: 'post author',
    },
    {
      id: 1,
      user: userStore.loggedInUserData?.user.full_name,
      post_title: '10 words from the post title ',
      comm_name: 'community of the post form the store',
      comment: 'comment from user',
      posted_by: 'post author',
      post_time: '2 hrs ago',
    },
  ];

  const dropdownTopics = [
    {
      id: 1,
      label: 'Save',
      icon: () => <IconDownload />,
    },
    {
      id: 2,
      label: 'Delete',
      icon: () => <IconDropletDown />,
    },
    {
      id: 3,
      label: 'Edit',
      icon: () => <IconPencil />,
    },
  ];
  const useStyles = createStyle();
  const { classes } = useStyles();
  const CommentCard = () => {
    return (
      <Flex direction="column" className={classes.container}>
        {commentData.map((item) => (
          <div key={item.id}>
            <Group>
              <IconMessage />
              <Text>
                {item.user} commented on {item.post_title}{' '}
              </Text>
            </Group>
            <Divider size="sm" />
            {/* comment box */}
            <Box className={classes.commentBox}>
              <Stack>
                <Group>
                  {item.user} &#8226; {item.post_time}
                </Group>
                <Text> {item.comment}</Text>
              </Stack>
              <Group sx={{ cursor: 'pointer', marginTop: '5px' }}>
                <Text
                  c={'dimmed'}
                  fw={'bolder'}
                  onClick={() => {
                    router.push('/');
                  }}
                  sx={{ '&:hover': { color: theme.colors.black[7], textDecoration: 'underline' } }}
                >
                  Reply
                </Text>
                <Text
                  c={'dimmed'}
                  fw={'bolder'}
                  onClick={() => {
                    router.push('/');
                  }}
                  sx={{ '&:hover': { color: theme.colors.black[7], textDecoration: 'underline' } }}
                >
                  Share
                </Text>

                <Menu shadow="md" width={150}>
                  <Menu.Target>
                    <ActionIcon variant={'gradient'} size="sm">
                      {' '}
                      <IconDots />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {dropdownTopics.map((item) => (
                      <Menu.Item key={item.id}>
                        <Group>
                          {item.icon()}
                          <Text c={'dimmed'} fw={'bolder'}>
                            {item.label}
                          </Text>
                        </Group>
                      </Menu.Item>
                    ))}
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Box>
          </div>
        ))}
      </Flex>
    );
  };
  return <CommentCard />;
};

export default ProfileOverviewCard;
