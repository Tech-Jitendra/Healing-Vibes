import { Flex, Button, Menu, useMantineTheme, ActionIcon, rem } from '@mantine/core';
import { IconDots, IconDropletDown } from '@tabler/icons-react';
import React from 'react';
import { createStyle } from './CommunityJoinFilter.style';

const communityJoinTopics = [
  {
    label: 'Best',
    key: 'best',
  },
  { label: 'Hot', key: 'hot' },
  { label: 'New', key: 'new' },
  { label: 'Top', key: 'top' },
];

const dropdownTopics = [
  { label: 'Now' },
  { label: 'Today' },
  { label: 'This Month' },
  { label: 'This Week' },
  { label: 'This Year' },
  { label: 'All Time' },
];

const CommunityJoinFilter = () => {
  const theme = useMantineTheme();
  const useStyles = createStyle();
  const { classes } = useStyles();
  return (
    <Flex className={classes.filterContainer}>
      {communityJoinTopics.map((item) => (
        <Button variant={'subtle'} key={item.key} className={classes.btns}>
          {item.label}
        </Button>
      ))}
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button variant={'default'}>
            Today &nbsp;
            <ActionIcon variant="subtle" color={theme.colors.teal[2]}>
              <IconDots />
            </ActionIcon>
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          {dropdownTopics.map((item) => (
            <Menu.Item key={item.label}>
              {item.label}
              <Menu.Divider />
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
};

export default CommunityJoinFilter;
