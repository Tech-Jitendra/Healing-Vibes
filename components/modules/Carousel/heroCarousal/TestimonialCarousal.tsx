/* eslint-disable import/extensions */

import { Flex, Image, Box, useMantineTheme, Card } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import { BaseText } from '@/components/elements/BaseText/BaseText';
import { createStyle } from './TestimonialCarousal.style';

interface CarouselProps {
  carouselData: Array<Object>;
  orientation?: any;
}

function TestimonialCarousal({ carouselData, orientation }: CarouselProps) {
  const theme = useMantineTheme();
  const useStyles = createStyle();
  const { classes } = useStyles();
  // const autoplay = useRef(Autoplay({ delay: 200 }));

  return (
    <>
      <Carousel
        maw="100%"
        mx="auto"
        height={250}
        slideSize="60%"
        align="start"
        withIndicators
        // onMouseEnter={autoplay.current.stop}
        // onMouseLeave={autoplay.current.reset}
        // plugins={[autoplay.current]}
        orientation={orientation}
        // withControls={false}
        loop
      >
        {carouselData.map((item: any, id: any) => (
          <Carousel.Slide key={id} className={classes.crouselSlide}>
            <Card className={classes.testimonialCard}>
              <Box className={classes.carousel_image}>
                <Image src={item.userProfileImg} alt="userImage" />
              </Box>

              <Box className={classes.carousel_text}>
                <Flex
                  gap={14}
                  justify="center"
                  align="center"
                  className={classes.carousel_textFlex}
                >
                  <BaseText color_variant={theme.colors.dark[9]} fontWeight_variant={700}>
                    {item.userName}
                  </BaseText>
                  <BaseText color_variant={theme.colors.dark[9]} fontWeight_variant={400}>
                    {item.role}
                  </BaseText>
                </Flex>

                <BaseText>{item.content}</BaseText>
              </Box>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
}

export default TestimonialCarousal;
