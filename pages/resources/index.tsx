/* eslint-disable import/extensions */
import { Box, Button, Container, Flex, Image, Stack, Text } from '@mantine/core';

import { IconSearch } from '@tabler/icons-react';
import { Images } from '@/public';
import { createStyle } from './resources.styles';

export default function Resources() {
  const useStyles = createStyle();
  const { classes } = useStyles();
  return (
    <>
      <Container maw="100%">
        <Box className={classes.Header}>
          <Flex justify="space-between" align="center" wrap="wrap">
            <Text weight={800} size={64}>
              D.{' '}
            </Text>

            <Box className={classes.NavItems}>
              <Flex justify="space-between" align="center">
                <Text size={24} weight={400}>
                  {' '}
                  Blog
                </Text>
                <Text size={24} weight={400}>
                  {' '}
                  Contact
                </Text>
                <Text size={24} weight={400}>
                  {' '}
                  About
                </Text>

                <Button>
                  <IconSearch height={17.5} width={17.5} color="#021718" />
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
        {/* <Box className={classes.HeroSection}> */}
        <Flex justify="space-between" align="center" style={{ backgroundColor: '#F5A05C' }}>
          <Box w={418} className={classes.HeroText}>
            <Stack spacing={24}>
              <Text size={64} weight={900} color="#021718">
                Hi, I’m Darlene
              </Text>
              <Box w={418}>
                <Text size={24} weight={400} color="#021718">
                  I design beautiful websites & mobile apps that modern trends demand
                </Text>
              </Box>
            </Stack>
            <Button mt={32} className={classes.btn}>
              <Text size={24} weight={400}>
                Contact me
              </Text>
            </Button>
          </Box>
          {/* rightside */}

          {/* <Image src="/heroSvg.svg" className={classes.HeroSvg} w={1624} h={1326} /> */}

          <Container
            className={classes.rightSide}
            sx={{
              backgroundImage: `url(${Images.BGShape})`,
              // position: 'relative',
              // top: '-258px',
              // left: '393px',
              width: '1624px',
              height: '1326px',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Box
              w={500}
              h={500}
              style={{
                transform: 'rotate(-5.465deg)',
                backgroundColor: '#44A1A0',
                // position: 'absolute',
                // position: 'absolute',
              }}
            >
              <Image
                src="/testResource.png"
                width={500}
                height={500}
                sx={{ transform: 'rotate(5.465deg)' }}
              />
            </Box>
          </Container>
        </Flex>
        {/* <Box
          sx={{
            backgroundImage: "url("+Images.BGShape+")",
          }}
        >
          sadcdcs
        </Box> */}
        {/* </Box> */}
      </Container>
    </>
  );
}
