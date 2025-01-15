import { Card, Group, Avatar, Text, Image } from '@mantine/core';
import { IconDownload, IconEdit, IconHttpDelete, IconMessage, IconShare, IconTrash } from '@tabler/icons-react';
import React from 'react';
import { createStyle } from './UserPosts.styles';

const UserPosts = () => {
  const useStyles = createStyle();
  const { classes } = useStyles();
  const userPost = [
    {
        id: 1,
        post_img:"https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",


    }
  ]
  const postTools = [
    {
      id: 1,
      num: 0, // The number will be fetched from the user posts in the store
      label: 'Comment',
      icon: () => <IconMessage size="1.5rem" />,
    },
    {
      id: 2,
      label: "Share",
      icon: () => <IconShare size="1.5rem" />,
    },
    {
      id: 3,
      label: "Edit Post",
      icon: () => <IconEdit size="1.5rem" />,
    },
    {
      id: 4,
      label: "Delete",
      icon: () => <IconHttpDelete size="1.5rem" />,
    },
    {
      id: 5,
      label: "Save",
      icon: () => <IconDownload size="1.5rem" />,
    },
    {
      id: 6,
      label: "Hide",
      icon: () => <IconTrash size="1.5rem" />,
    },
  ];
  
  return (
    <Card  radius="md" className={classes.container}>
      <Group noWrap>    
        <Image
          src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
          alt="post-img"
          height={"auto"}
          width={96}
          radius="sm"
          sx={{objectFit: "contain"}}
        />
        <div>
          <Text tt="uppercase" c="dimmed" fw={700} size="xs">
            technology
          </Text>
          <Text>
            The best laptop for Frontend engineers in 2022
          </Text>
          <Group noWrap spacing="xs">
            <Group spacing="xs" noWrap>
              <Avatar
                size={20}
                src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
                alt="user-avatar"
              />
              <Text size="xs">Elsa Typechecker</Text>
            </Group>
            <Text size="xs" c="dimmed">
              •
            </Text>
            <Text size="xs" c="dimmed">
              Feb 6th
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
};

export default UserPosts;
