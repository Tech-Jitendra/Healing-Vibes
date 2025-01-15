import { forwardRef } from 'react';
import {
  IconBuildingCommunity,
  IconChevronDown,
  IconChevronRight,
  IconLogout,
  IconSettings,
  IconUserCircle,
} from '@tabler/icons-react';
import { Group, Avatar, Text, Menu, UnstyledButton, Button, Indicator } from '@mantine/core';
import { useStores } from '@/models';
import { useRouter } from 'next/router';
interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string | undefined;
  name: string | undefined;
  email: string | undefined;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: 'block',
        height: '50%',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.black,

        '&:hover': {
          border: '1px solid dark',
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
      {...others}
    >
      <Group>
        <Indicator color="teal" position="bottom-end" processing offset={4}>
          <Avatar src={image} radius="xl" />
        </Indicator>

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <IconChevronDown size="1rem" />}
      </Group>
    </UnstyledButton>
  )
);

export function ProfileSection() {
  const { userStore } = useStores();
  const router = useRouter();
  // console.log("userdata====",JSON.stringify(userStore.loggedInUserData?.user, null, 2));
  const loggedInUserData = userStore.loggedInUserData?.user;
  const dropDownItems = [
    {
      id: 1,
      name: 'Profile',
      icon: <IconUserCircle size="1.5rem" />,
      link: `/user-profile?username=${loggedInUserData ? loggedInUserData.full_name : 'guest'}`,
    },
    {
      id: 2,
      name: 'Create Community',
      icon: <IconBuildingCommunity size="1.5rem" />,
      link: '/community/create',
    },
    {
      id: 3,
      name: 'Settings',
      icon: <IconSettings size="1.5rem" />,
      link: '/settings',
    },
  ];
  const logoutFromDropDown = async () => {
    try {
      const res = await userStore.logoutUser();
      if (res.ok) {
        router.push('/login');
      }
    } catch (err) {
      console.log('error while logingout from the dropdown section ', err);
    }
  };
  // console.log("loddeduser data==",JSON.stringify(loggedInUserData?._data, null, 2));
  return (
    <Group position="center">
      <Menu
        withArrow
        width={250}
        position="bottom"
        transitionProps={{ transition: 'pop' }}
        withinPortal
      >
        <Menu.Target>
          <UserButton
            //loggedInUserData?.avatar
            image={
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
            }
            name={loggedInUserData?.full_name}
            email={loggedInUserData?.email}
          />
        </Menu.Target>
        <Menu.Dropdown>
          {dropDownItems &&
            dropDownItems.map((dropDownItem) => (
              <Menu.Item
                key={dropDownItem.id}
                onClick={() => {
                  router.push(dropDownItem.link.replace(' ', '-'));
                }}
              >
                <Button variant="" leftIcon={dropDownItem.icon}>
                  {dropDownItem.name}
                </Button>
              </Menu.Item>
            ))}
          <Menu.Item>
            <Button variant="" leftIcon={<IconLogout size="1.5rem" />} onClick={logoutFromDropDown}>
              Logout
            </Button>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
