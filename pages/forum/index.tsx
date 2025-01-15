/* eslint-disable import/extensions */
import { Container, Flex, Group, Button, Title, Card, Image, Stack, Box } from '@mantine/core';
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useMediaQuery } from '@mantine/hooks';
import Header from '@/components/modules/Header/Header';
import { createStyle } from './Forum.styles';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import PageSearchBox from '@/components/modules/PageSearchbox';
import TopicsBox from '@/components/modules/TopicsBox';
import { Images } from '@/public/index';
import BadgesMenu from '@/components/elements/BadgesMenu';
import FollowBtn from '@/components/modules/FollowBtn';

const userCardData = [
  {
    id: 1,
    name: 'Albert John',
    timestamp: '2 hours ago',
    likes: '1.2k',
    comments: '208',
    title: 'Forum for Peer Support',
    description:
      'Join our community to connect with fellow patients, caregivers, and healthcare professionals.',
    forumUserImage: Images.forumUserImage,
  },
  {
    id: 2,
    name: 'Sarah Smith',
    timestamp: '1 day ago',
    likes: '850',
    comments: '124',
    title: 'Health Conversations Corner',
    description: 'Looking for insights on managing chronic pain. Share your experiences here.',
    forumUserImage: Images.forumUserImage,
  },
  {
    id: 3,
    name: 'John Doe',
    timestamp: '3 hours ago',
    likes: '750',
    comments: '92',
    title: 'Patient Exchange Hub',
    description: 'Discuss the latest treatments for diabetes and share your success stories.',
    forumUserImage: Images.forumUserImage,
  },
  {
    id: 4,
    name: 'Emily Brown',
    timestamp: '4 hours ago',
    likes: '1.5k',
    comments: '198',
    title: 'Wellness Warriors Forum',
    description:
      'Join us to explore holistic wellness practices and tips for a healthier lifestyle.',
    forumUserImage: Images.forumUserImage,
  },
  {
    id: 5,
    name: 'Mark Anderson',
    timestamp: '5 hours ago',
    likes: '620',
    comments: '75',
    title: 'Parenting Challenges Forum',
    description: 'Discuss parenting challenges and share advice on balancing family and health.',
    forumUserImage: Images.forumUserImage,
  },
  // You can keep adding more user data objects here
];

export default function Forum() {
  const useStyles = createStyle();
  const { classes } = useStyles();
  const tabResponsivebreakpoint = useMediaQuery('(max-width:  53.5em)');
  const mobileRespinsiveBreakPoint = useMediaQuery('(max-width: 37.875em)');
  const badgesBreakpoint = useMediaQuery('(max-width: 25.125em)');
  const [searchText, setSearchText] = useState<any>(' ');
  const handleSearchChange = (e: any) => setSearchText(e.target.value);

  return (
    <>
      <Container maw={1250}>
        <Box className={classes.container}>
          {/**heading */}
          <Flex justify="space-between" align="center">
            <Title order={3}>
              <BaseText
                color="black"
                fontWeight_variant={700}
                size={tabResponsivebreakpoint ? 25 : 40}
                mb={tabResponsivebreakpoint ? 10 : 0}
              >
                Forum
              </BaseText>
            </Title>
            {badgesBreakpoint ? (
              <BadgesMenu />
            ) : (
              <Group spacing={tabResponsivebreakpoint ? 10 : 32}>
                <Button className={classes.badges}>My questions</Button>
                <Button className={classes.badges}>Ask questions</Button>
              </Group>
            )}
          </Flex>
          {/**content */}
          <Box className={classes.contentBox}>
            <TopicsBox />
            <Flex direction="column" gap="sm">
              <PageSearchBox
                num={312}
                type="forums"
                searchText={searchText}
                onSearchChange={handleSearchChange}
              />
              {searchText
                ? userCardData
                    .filter((card) => {
                      const cardString = [card.description, card.name, card.title, card.timestamp]
                        .join(' ')
                        .toLowerCase();
                      return cardString.includes(searchText.toLowerCase());
                    })
                    .map((user: any) => (
                      <Card key={user.id} className={classes.card} shadow="lg">
                        {/** upper section */}
                        <Flex align="center" justify="space-between">
                          <Box className={classes.userInfo}>
                            <Group spacing={24}>
                              <Image
                                src={user.forumUserImage}
                                alt="user"
                                width={56}
                                height={56}
                                radius={56}
                              />
                              <Stack spacing={8}>
                                <BaseText size_variant="md" fontWeight_variant={700}>
                                  {user.name}
                                </BaseText>
                                <BaseText size_variant="sm" fontWeight_variant={500}>
                                  {user.timestamp}
                                </BaseText>
                              </Stack>
                            </Group>
                          </Box>

                          <Box className={classes.icons}>
                            <Group spacing={mobileRespinsiveBreakPoint ? 4 : 16}>
                              <Box className={classes.forumIcons}>
                                <Icon icon="mdi:eye" />
                                <BaseText size_variant="sm" fontWeight_variant={400}>
                                  {user.likes}
                                </BaseText>
                              </Box>
                              <Box className={classes.forumIcons}>
                                <Icon icon="mdi:insert-comment" hFlip />
                                <BaseText size_variant="sm" fontWeight_variant={400}>
                                  {user.comments}
                                </BaseText>
                              </Box>
                              <FollowBtn />
                            </Group>
                          </Box>
                        </Flex>

                        {/** content */}

                        <Box
                          mt={mobileRespinsiveBreakPoint ? 10 : 20}
                          pl={mobileRespinsiveBreakPoint ? 'sm ' : 'lg'}
                        >
                          <Flex
                            direction="column"
                            gap={mobileRespinsiveBreakPoint ? 3 : 6}
                            mt={mobileRespinsiveBreakPoint ? 15 : 0}
                          >
                            <Box
                              style={{
                                textAlign: mobileRespinsiveBreakPoint ? 'center' : 'left',
                              }}
                            >
                              <BaseText
                                size={mobileRespinsiveBreakPoint ? 15 : 20}
                                fontWeight_variant={600}
                              >
                                {user.title}
                              </BaseText>
                              <BaseText
                                size={mobileRespinsiveBreakPoint ? 12 : 16}
                                fontWeight_variant={400}
                              >
                                {user.description}
                              </BaseText>
                            </Box>
                          </Flex>
                        </Box>
                      </Card>
                    ))
                : userCardData.map((user: any) => (
                    <Card key={user.id} className={classes.card} shadow="lg">
                      {/** upper section */}
                      <Flex align="center" justify="space-between">
                        <Box className={classes.userInfo}>
                          <Group spacing={24}>
                            <Image
                              src={user.forumUserImage}
                              alt="user"
                              width={56}
                              height={56}
                              radius={56}
                            />
                            <Stack spacing={8}>
                              <BaseText size_variant="md" fontWeight_variant={700}>
                                {user.name}
                              </BaseText>
                              <BaseText size_variant="sm" fontWeight_variant={500}>
                                {user.timestamp}
                              </BaseText>
                            </Stack>
                          </Group>
                        </Box>

                        <Box className={classes.icons}>
                          <Group spacing={mobileRespinsiveBreakPoint ? 4 : 16}>
                            <Box className={classes.forumIcons}>
                              <Icon icon="mdi:eye" />
                              <BaseText size_variant="sm" fontWeight_variant={400}>
                                {user.likes}
                              </BaseText>
                            </Box>
                            <Box className={classes.forumIcons}>
                              <Icon icon="mdi:insert-comment" hFlip />
                              <BaseText size_variant="sm" fontWeight_variant={400}>
                                {user.comments}
                              </BaseText>
                            </Box>
                            <FollowBtn />
                          </Group>
                        </Box>
                      </Flex>

                      {/** content */}

                      <Box
                        mt={mobileRespinsiveBreakPoint ? 10 : 20}
                        pl={mobileRespinsiveBreakPoint ? 'sm ' : 'lg'}
                      >
                        <Flex
                          direction="column"
                          gap={mobileRespinsiveBreakPoint ? 3 : 6}
                          mt={mobileRespinsiveBreakPoint ? 15 : 0}
                        >
                          <Box
                            style={{
                              textAlign: mobileRespinsiveBreakPoint ? 'center' : 'left',
                            }}
                          >
                            <BaseText
                              size={mobileRespinsiveBreakPoint ? 15 : 20}
                              fontWeight_variant={600}
                            >
                              {user.title}
                            </BaseText>
                            <BaseText
                              size={mobileRespinsiveBreakPoint ? 12 : 16}
                              fontWeight_variant={400}
                            >
                              {user.description}
                            </BaseText>
                          </Box>
                        </Flex>
                      </Box>
                    </Card>
                  ))}
            </Flex>
          </Box>
        </Box>
      </Container>
    </>
  );
}
