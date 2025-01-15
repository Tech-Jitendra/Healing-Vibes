/* eslint-disable import/extensions */
import Link from 'next/link';
import { Images } from '@/public';
import { useStores } from '@/models';
import { useRouter } from 'next/router';
import HeaderMobile from './HeaderMobile';
import { createStyle } from './Header.style';
import { useMediaQuery } from '@mantine/hooks';
import { ProfileSection } from '../ProfileSection/ProfileSection';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import AuthButtons from '@/components/modules/AuthBtns/AuthButtons';
import { SearchInput } from '@/components/elements/SearchInput/SearchInput';
import { Box, Container, Flex, Group, Image, useMantineTheme } from '@mantine/core';

function Header() {
  const theme = useMantineTheme();
  const useStyles = createStyle();
  const { classes } = useStyles();
  const router = useRouter();
  const isMobileView = useMediaQuery('(max-width: 69.0625em)');
  const { userStore } = useStores();

  if (isMobileView) {
    return (
      <Container maw="100%" className={classes.containerMobile}>
        <Group spacing={15}>
          <HeaderMobile />
          <Link href="/">
            <Image src={Images.talkhealingLogo} width="134.008px" height="24px" />
          </Link>
        </Group>
      </Container>
    );
  }
  // console.log("logged in", userStore.is_logged_in);
  const showProfile = userStore.is_logged_in;

  return (
    <Container maw={1250}>
      <Box className={classes.containerBox}>
        {/**Header mainHeading */}
        <Flex justify="space-between" align="center" mt="10px">
          <Link href="/">
            <Image src={Images.talkhealingLogo} width="134.008px" height="24px" />
          </Link>

          <Group spacing={25}>
            <BaseText
              fontWeight_variant={700}
              color={theme.colors.black[9]}
              onClick={() => router.push('/forum')}
              style={{ cursor: 'pointer' }}
            >
              Forum
            </BaseText>
            <BaseText
              fontWeight_variant={700}
              color={theme.colors.black[9]}
              onClick={() => router.push('/community')}
              style={{ cursor: 'pointer' }}
            >
              Community
            </BaseText>
          </Group>

          <SearchInput placeholder="Search..." />

          {/* <Group>
            <BaseButton style_variant="filled" className={classes.loginButton} color_variant="lime">
              <BaseText
                size={15}
                fontWeight_variant={700}
                onClick={() => {
                  router.push('/login');
                }}
                txtkey="global.button.login"
              />
            </BaseButton>

            <BaseButton style_variant="filled" className={classes.loginButton} color_variant="blue">
              <BaseText
                size={15}
                fontWeight_variant={700}
                onClick={() => {
                  router.push('/signup');
                }}
                txtkey="global.button.signup"
              />
            </BaseButton>
          </Group> */}

          {showProfile ? <ProfileSection /> : <AuthButtons />}
        </Flex>

        {/**Navlinks subheading */}
        <Flex
          justify="space-evenly"
          align="center"
          h={50}
          w="100%"
          className={classes.subHeadingText}
          mt="0px"
          wrap="wrap"
        >
          <Link href="/latest-research">
            <BaseText className={`${classes.navLinks} ${classes.cursor}`}>
              Latest research <Image src={Images.link_icon} width="9.333px" height="8px" />
            </BaseText>
          </Link>

          <Link href="/experience-sharing">
            <BaseText className={`${classes.navLinks} ${classes.cursor}`}>
              Experience sharing <Image src={Images.link_icon} width="9.333px" height="8px" />
            </BaseText>
          </Link>

          {/* <Link href="/recovery-program">
            <BaseText className={`${classes.navLinks} ${classes.cursor}`}>
              Just for Testing <Image src={Images.link_icon} width="9.333px" height="8px" />
            </BaseText>
          </Link> */}

          {/* <Link href="/resources">
            <BaseText className={`${classes.navLinks} ${classes.cursor}`}>
              Test <Image src={Images.link_icon} width="9.333px" height="8px" />
            </BaseText>
          </Link> */}
        </Flex>
      </Box>
    </Container>
  );
}

export default Header;
