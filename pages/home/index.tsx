/* eslint-disable import/extensions */
import { Flex, Container, Box, SimpleGrid, Card, useMantineTheme, Center } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { typography } from '@/themes/Mantine/typography';
import { useStores } from '@/models';
import { Images } from '../../public/index';
import Header from '@/components/modules/Header/Header';
import { createStyle } from './Home.style';
import TestimonialCarousal from '@/components/modules/Carousel/heroCarousal/TestimonialCarousal';
import Image from 'next/image';

export default function Home() {
  const theme = useMantineTheme();
  const { i18nStore } = useStores();

  const useStyles = createStyle();
  const { classes } = useStyles();
  const responsiveTabGridBreakpoint = useMediaQuery('(max-width:  76.0625em)'); //1217px
  const responsiveMobileGridBreakpoint = useMediaQuery('(max-width: 47.4375em)'); //759px
  const responsiveGridSmallerScreens = useMediaQuery('(max-width: 37em)'); //592px
  const responsiveMainSection = useMediaQuery('(max-width: 60.875em)'); //974px
  const responsiveCaraousel = useMediaQuery('(max-width: 66em)'); //1056px

  interface HowItWorksItem {
    id: number;
    step: string;
    description: string;
  }
  const howItWorksData = [
    {
      id: 1,
      step: 'Sign Up and Complete Your Profile',
      description:
        "Begin your journey by creating your account on our patient portal. You'll need to provide some basic information such as your name, email, and a secure password. After signing up, complete your profile by adding additional details like your date of birth, gender, and any specific medical conditions you want to share with the community.",
    },
    {
      id: 2,
      step: 'Explore Communities and Connect with Others',
      description:
        'Browse through various communities and groups related to specific health conditions or topics of interest. Join communities that align with your needs and interests. Connect with fellow patients who share similar health experiences. You can send messages, comment on posts, or participate in group discussions.',
    },
    {
      id: 3,
      step: 'Share Your Experience and Offer Support',
      description:
        'Share your own experiences, stories, or insights related to your health journey. You can post text, images, or even videos to engage with the community. Support others by offering guidance, encouragement, or sharing resources. Your experience can be a source of inspiration for someone else.',
    },
    {
      id: 4,
      step: 'Stay Informed and Seek Advice',
      description:
        'Receive updates, news, and valuable information about your health condition and the latest research findings. Stay informed about events and webinars. Feel free to ask questions or seek advice from the community. Many members are willing to share their knowledge and experiences.',
    },
  ];

  // // Function to generate card content (how it works grid cards)
  // const generateCardContent = (item: HowItWorksItem, responsive: Boolean) => (

  // );

  const ResponsiveCardContent: React.FC<{ item: HowItWorksItem; responsive: Boolean }> = ({
    item,
    responsive,
  }) => (
    <Card
      padding={responsive ? 16 : 25}
      className={responsive ? classes.innerCardResponsive : classes.innerCard}
      key={item.id}
    >
      <Flex justify="space-between" align="center" gap={responsive ? 10 : 40}>
        <Flex
          direction="column"
          justify={responsive ? 'flex-evenly' : 'flex-start'}
          align="center"
          gap={responsive ? '20px' : '16px'}
        >
          <BaseText fontWeight_variant={700} size={28} color="black">
            {item.step}
          </BaseText>
          {!responsive && (
            <BaseText fontWeight_variant={400} size={12} color="black">
              {item.description}
            </BaseText>
          )}
        </Flex>
        <BaseText
          c={theme.colors.green[1]}
          style={typography.paragraph[i18nStore.getCurrentLanguage()].p7}
        >
          {item.id}
        </BaseText>
      </Flex>
      <Image height={60} width={60} src="/icons/know_more_icon.png" alt="know-more" />
    </Card>
  );
  // const howItWorkCards =React.FC<howItWorksData>(({howItWorksData}))=>({

  // })

  const testimonialData = [
    {
      userName: 'Albert John',
      role: 'Patient',
      userProfileImg: Images.userProfileImage,
      content: 'Very Good platform. Kudos to the developers and contributers',
    },
    {
      userName: 'Albert John',
      role: 'Patient',
      userProfileImg: Images.userProfileImage,
      content:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      userName: 'Albert John',
      role: 'Patient',
      userProfileImg: Images.userProfileImage,
      content:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      userName: 'Albert John',
      role: 'Patient',
      userProfileImg: Images.userProfileImage,
      content:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ];

  return (
    <>
      <Box className={classes.container}>
        {/**Main section */}
        <Container maw="1250px">
          {responsiveMainSection ? (
            <Flex justify="center" align="center" direction="column" gap={50}>
              <Box className={classes.responsiveSubMainText}>
                <Flex direction="column" justify="center" align="center" gap="17px">
                  <BaseText fontWeight_variant={700} size={25}>
                    {/* Online  */}
                    Medical Consulting Platform
                  </BaseText>

                  <Box className={classes.responsiveSecondSubMainText}>
                    {' '}
                    <BaseText>
                      An online medical consulting platform enables patients to connect with
                      licensed doctors for consultations from the comfort of their homes. This
                      reduces the need for physical visits, saves time, and provides access to
                      healthcare for those in remote areas.
                    </BaseText>
                  </Box>
                </Flex>
                <Image src={Images.public_health} alt="public_health" height={350} width={350} />
              </Box>
            </Flex>
          ) : (
            <Flex justify="space-evenly" align="center" wrap="wrap">
              <Box className={classes.subMainText}>
                <Flex direction="column" justify="flex-start" align="center" gap="17px">
                  <BaseText size={60} fontWeight_variant={700}>
                    {/* Online  */}
                    Medical Consulting Platform
                  </BaseText>

                  <BaseText style={{ opacity: 0.7 }} fontWeight_variant={400} size={16}>
                    An online medical consulting platform enables patients to connect with licensed
                    doctors for consultations from the comfort of their homes. This reduces the need
                    for physical visits, saves time, and provides access to healthcare for those in
                    remote areas.
                  </BaseText>
                </Flex>
              </Box>

              <Image
                className={classes.rightSide}
                src={Images.public_health}
                height={440}
                width={440}
                alt={'public-health'}
              />
            </Flex>
          )}
        </Container>

        {/* how it works */}
        <Box maw="100%">
          <BaseText
            fontWeight_variant={700}
            size={45}
            style={
              (typography.headings[i18nStore.getCurrentLanguage()].h3,
              { textAlign: 'center', marginTop: '150px' })
            }
          >
            How it works
          </BaseText>

          <Center>
            <SimpleGrid
              cols={
                responsiveGridSmallerScreens
                  ? 1
                  : responsiveTabGridBreakpoint
                  ? 2
                  : responsiveMobileGridBreakpoint
                  ? 1
                  : 2
              }
              spacing={40}
              className={
                responsiveMobileGridBreakpoint
                  ? classes.responsiveGridContainer
                  : classes.gridContainer
              }
            >
              {howItWorksData.map((item) => (
                <ResponsiveCardContent item={item} responsive={responsiveTabGridBreakpoint} />
              ))}
            </SimpleGrid>
          </Center>
        </Box>

        {/**testimonials */}
        {responsiveCaraousel ? (
          <Container maw={1250}>
            {' '}
            <Box className={classes.caraouselBox}>
              <Flex direction="column" gap={10}>
                <BaseText
                  c="black"
                  fontWeight_variant={700}
                  size={40}
                  style={{ textAlign: 'center' }}
                >
                  Testimonials
                </BaseText>
                <TestimonialCarousal carouselData={testimonialData} orientation="vertical" />
              </Flex>
            </Box>
          </Container>
        ) : (
          <Container maw={1250}>
            <Box className={classes.caraouselBox}>
              <Flex direction="column" gap={56} justify="flex-start">
                <BaseText c="black" fontWeight_variant={700} size={48}>
                  Testimonials
                </BaseText>
                <TestimonialCarousal carouselData={testimonialData} />
              </Flex>
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
}
