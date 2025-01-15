import AboutUser from '@/components/modules/User/AboutUser/AboutUser';
import CommunityJoinFilter from '@/components/modules/CommunityJoinFilter/CommunityJoinFilter';
import Header from '@/components/modules/Header/Header';
import ProfileOverviewCard from '@/components/modules/User/ProfileOverviewCard/ProfileOverviewCard';
import { Box, Container, Flex, Tabs, Text, useMantineTheme } from '@mantine/core';
import createStyle from '../community/join/Community_Join.style';
import UserPosts from '@/components/modules/User/UserPosts/UserPosts';

const User = () => {
  const theme = useMantineTheme();
  const useStyles = createStyle();
  const { classes } = useStyles();
  const tabItemsData = [
    {
      id: 1,
      title: 'Overview',
      item: () => <ProfileOverviewCard />,
    },
    {
      id: 2,
      title: 'Posts',
      item: () => <UserPosts />,
    },
    {
      id: 3,
      title: 'Comments',
      item: () => <CommunityJoinFilter />,
    },
  ];
  return (
    <>
      <Container maw={1250}>
        <Box className={classes.container}>
          <Flex className={classes.heroCommunityJoin}>
            <Box w="600px">
              <Box >
                <Tabs defaultValue={tabItemsData[0].title} color="teal">
                  <Tabs.List>
                    {tabItemsData.map((tab) => (
                      <Tabs.Tab value={tab.title} key={tab.id}>
                        <Text fw={'bolder'}>{tab.title.toUpperCase()}</Text>
                      </Tabs.Tab>
                    ))}
                  </Tabs.List>
                  {tabItemsData.map((tab) => (
                    <Tabs.Panel value={tab.title} pt="xs" key={tab.id}>
                      {tab.item()}
                    </Tabs.Panel>
                  ))}
                </Tabs>
              </Box>
            </Box>

            <AboutUser />
          </Flex>
        </Box>
      </Container>
    </>
  );
};

export default User;
