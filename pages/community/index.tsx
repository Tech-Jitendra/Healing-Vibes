import { useState } from 'react';
/* eslint-disable import/extensions */
import {
  Container,
  Flex,
  Button,
  SimpleGrid,
  Card,
  Image,
  useMantineTheme,
  Box,
} from '@mantine/core';
import { createStyle } from './Community.style';
import Header from '@/components/modules/Header/Header';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import PageSearchBox from '@/components/modules/PageSearchbox';
import { Images } from '@/public';
import JoinNowBtn from '@/components/modules/JoinNowBtn';
import NoDataFound from '@/components/modules/NoDataFound/NoDataFound';

const communityCardData = [
  {
    id: 1,
    communityName: 'Cancer Community',
    timestamp: '1 day ago',
    communityImg: Images.communityCardImage,
  },
  {
    id: 2,
    communityName: 'Fever Community',
    timestamp: '2 days ago',
    communityImg: Images.communityCardImage,
  },
  {
    id: 3,
    communityName: 'Diabetes Support Group',
    timestamp: '5 hours ago',
    communityImg: Images.communityCardImage,
  },
  {
    id: 4,
    communityName: 'Heart Health Network',
    timestamp: '3 days ago',
    communityImg: Images.communityCardImage,
  },
  {
    id: 5,
    communityName: 'Mental Health Alliance',
    timestamp: '12 hours ago',
    communityImg: Images.communityCardImage,
  },
  {
    id: 6,
    communityName: 'Arthritis Warriors',
    timestamp: '4 days ago',
    communityImg: Images.communityCardImage,
  },
  {
    id: 7,
    communityName: 'Asthma Aid Society',
    timestamp: '6 hours ago',
    communityImg: Images.communityCardImage,
  },
  {
    id: 8,
    communityName: 'Allergy Care Forum',
    timestamp: '2 days ago',
    communityImg: Images.communityCardImage,
  },
  {
    id: 9,
    communityName: 'Stroke Survivors',
    timestamp: '1 day ago',
    communityImg: Images.communityCardImage,
  },
  {
    id: 10,
    communityName: 'COVID-19 Support Group',
    timestamp: '2 days ago',
    communityImg: Images.communityCardImage,
  },
];
export default function Community() {
  const useStyles = createStyle();
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [searchText, setSearchText] = useState<any>(' ');
  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value);
  };
  const filteredData = communityCardData.filter((card) => {
    const filterCardString = [card.communityName, card.timestamp, card.communityName]
      .join(' ')
      .toLowerCase();
    return filterCardString.includes(searchText.toLowerCase());
  });

  // const tabResponsiveBreakPoint = useMediaQuery('(max-width: 76.8125em)');
  // const mobileResponsiveBreakPoint = useMediaQuery('(max-width: 41.9375em)');

  return (
    <>
      <Container maw={1250}>
        <Box className={classes.container}>
          <Box className={classes.subBodyFlex}>
            <BaseText>Patients Community</BaseText>
            <Button className={classes.button_container} variant="default">
              Create community
            </Button>
          </Box>
          <PageSearchBox
            num={89}
            type="communities"
            searchText={searchText}
            onSearchChange={handleSearchChange}
          />

          <SimpleGrid
            cols={3}
            breakpoints={[
              { minWidth: 575, cols: 1 }, // For small screens (sm breakpoint)
              { minWidth: 750, cols: 2 }, // For medium screens (md breakpoint)
              { minWidth: 1100, cols: 3 }, // For large screens (lg breakpoint)
            ]}
            className={classes.centerGridCard}
          >
            {searchText ? (
              filteredData.length === 0 ? (
                <NoDataFound />
              ) : (
                filteredData.map((community) => (
                  <Card key={community.id} className={classes.card_container}>
                    <Image
                      src={community.communityImg}
                      alt={community.communityName}
                      height="200px"
                      width="100%"
                      style={{ objectFit: 'cover' }}
                    />
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      gap={8}
                      mt={32}
                      mb={30}
                    >
                      <BaseText fontWeight_variant={700} size={20}>
                        {community.communityName}
                      </BaseText>
                      <BaseText fontWeight_variant={500} size={16} color={theme.colors.gray[8]}>
                        {community.timestamp}
                      </BaseText>
                    </Flex>
                    <Flex justify="center" align="center" direction="column">
                      <Image src={Images.avatarsCommunityGroup} height={32} width={193} />
                      <JoinNowBtn />
                    </Flex>
                  </Card>
                ))
              )
            ) : (
              communityCardData.map((community) => (
                <Card key={community.id} className={classes.card_container}>
                  <Image
                    src={community.communityImg}
                    alt={community.communityName}
                    height="200px"
                    width="100%"
                    style={{ objectFit: 'cover' }}
                  />
                  <Flex direction="column" align="center" justify="center" gap={8} mt={32} mb={30}>
                    <BaseText fontWeight_variant={700} size={20}>
                      {community.communityName}
                    </BaseText>
                    <BaseText fontWeight_variant={500} size={16} color={theme.colors.gray[8]}>
                      {community.timestamp}
                    </BaseText>
                  </Flex>
                  <Flex justify="center" align="center" direction="column">
                    <Image src={Images.avatarsCommunityGroup} height={32} width={193} />
                    <JoinNowBtn />
                  </Flex>
                </Card>
              ))
            )}
          </SimpleGrid>
        </Box>
      </Container>
    </>
  );
}
