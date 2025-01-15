/* eslint-disable import/extensions */
import React, { useState, useEffect, ReactNode } from 'react';
import { Button, Container, Flex, Box, Card, Group, Image } from '@mantine/core';
import { Icon } from '@iconify/react';
import { useDisclosure } from '@mantine/hooks';

import { observer } from 'mobx-react-lite';
import Header from '@/components/modules/Header/Header';
import { createStyle } from './experience-sharing.styles';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import PageSearchBox from '@/components/modules/PageSearchbox';
import { typography } from '@/themes/Mantine/typography';
import { useStores } from '@/models';
import FollowBtn from '@/components/modules/FollowBtn';
import AddNewExp from '@/components/modules/Modals/ExperienceModal/addNewExp';
import NoDataFound from '@/components/modules/NoDataFound/NoDataFound';

interface ExperienceCard {
  id: number;
  title: string;
  description: string;
  datePosted: string;
  likes: number;
  comments: number;
  userImg: string;
  userName: string;
  userHandle: string;
}
const experienceCards = [
  {
    id: 1,
    title: 'First Experience',
    description: 'This is the description of the first experience.',
    datePosted: '2023-01-10',
    likes: 25,
    comments: 10,
    userImg: 'user1.jpg',
    userName: 'John Doe',
    userHandle: '@johndoe',
  },
  {
    id: 2,
    title: 'Second Experience',
    description: 'This is the description of the second experience.',
    datePosted: '2023-02-15',
    likes: 30,
    comments: 15,
    userImg: 'user2.jpg',
    userName: 'Jane Smith',
    userHandle: '@janesmith',
  },
  {
    id: 3,
    title: 'Third Experience',
    description: 'This is the description of the third experience.',
    datePosted: '2023-03-20',
    likes: 40,
    comments: 20,
    userImg: 'user3.jpg',
    userName: 'Alice Johnson',
    userHandle: '@alicejohnson',
  },
  // Add more objects as needed
];

// console.log('---expCardData---', JSON.stringify(experienceCards, null, 1));

const FORUM_ICONS = [
  { id: 1, icon: 'zondicons:calendar', key: 'datePosted' },
  { id: 2, icon: 'mdi:eye', key: 'likes' },
  { id: 3, icon: 'mdi:insert-comment', key: 'comments' },
];

const Experience = observer(() => {
  const useStyles = createStyle();
  const { classes } = useStyles();
  const { i18nStore, experienceStore } = useStores();
  const { experienceCardData } = experienceStore;
  const [opened, { open, close }] = useDisclosure(false);
  const [searchText, setSearchText] = useState<string>('');
  const [resolvedFilterData, setResolvedFilterData] = useState<Array<any>>();

  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value);
    // console.log(searchText);
  };

  const CardExp = (props: { item: any }) => {
    console.log(props.item?.toJSON);

    return (
      <Card className={classes.cardContainer} key={props.item.id} padding="34px" shadow="lg">
        {/* cardHead */}
        <Box className={classes.cardHead}>
          <Group>
            <Image
              src={props.item.userImg}
              width={55}
              height={55}
              radius="xl"
              style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
            />
            <Flex direction="column" align="flex-start" justify="center" gap={0}>
              <BaseText fontWeight_variant={600}>{props.item.userName}</BaseText>
              <BaseText c="gray" size={14}>
                {props.item.userHandle}
              </BaseText>
            </Flex>
          </Group>
          <FollowBtn />
        </Box>
        {/* cardContent */}
        <Box className={classes.cardContent}>
          <BaseText style={typography.headings[i18nStore.getCurrentLanguage()].h10}>
            {props.item.title}
          </BaseText>
          <BaseText
            className={classes.content}
            style={{
              ...typography.paragraph[i18nStore.getCurrentLanguage()]['p1.5'],
              opacity: 0.7,
              marginTop: '6px',
            }}
          >
            {props.item.description}
          </BaseText>
          {/* icons */}
          <Box className={classes.Icons}>
            {FORUM_ICONS.map((forum) => (
              <Box className={classes.forumIcons} key={forum.id}>
                <Icon icon={forum.icon} />
                <BaseText size_variant="sm" fontWeight_variant={400}>
                  {props.item[forum.key as keyof ExperienceCard]}
                </BaseText>
              </Box>
            ))}
            <Icon icon="ic:sharp-share" />
          </Box>
        </Box>
      </Card>
    );
  };

  const getFilteredData = async () => {
    try {
      const res = await experienceStore.getFilteredExperienceCard(searchText);
      console.log('getFiltDataMethod', res);
      return res;
    } catch (error) {
      console.log('Error', error);
    }
  };

  const asyncFilteredComponent = () => {
    const fetchData = async () => {
      try {
        const data = await getFilteredData();
        if (data && data.length === 0) {
          setResolvedFilterData([]);
        } else if (data) {
          setResolvedFilterData(data);
        }
      } catch (error) {
        console.log('Error', error);
      }
    };

    return fetchData();
  };

  useEffect(() => {
    asyncFilteredComponent();
  }, [searchText]);

  return (
    <>
      <Container maw={1250}>
        <Box className={classes.container}>
          {/**Page heading */}
          <Flex justify="space-between" align="center" className={classes.headingFlex}>
            <BaseText color="black" fontWeight_variant={700}>
              Experience sharing
            </BaseText>
            {/**Add new button */}
            <AddNewExp opened={opened} onClose={close} />
            <Button variant="default" color="gray" radius={11} onClick={open}>
              Add new
            </Button>
          </Flex>

          {/** PageSearchbar */}
          <Box className={classes.pgeSearchBox}>
            <PageSearchBox
              num={200}
              type="experiences"
              searchText={searchText}
              onSearchChange={handleSearchChange}
            />
          </Box>

          {/**main container */}
          <Flex direction="column" gap={16} align="center" justify="center">
            {searchText ? (
              resolvedFilterData && resolvedFilterData?.length ? (
                resolvedFilterData?.map((item) => <CardExp item={item} />)
              ) : (
                <NoDataFound />
              )
            ) : (
              experienceCardData.map((item) => <CardExp item={item} />)
            )}
          </Flex>
        </Box>
      </Container>
    </>
  );
});
export default Experience;
