/* eslint-disable import/extensions */
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Burger, Flex, Group, Text, Stack, Box, Image } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Images } from '@/public';
import { createStyle } from './HeaderMobile.style';
import { BaseButton } from '@/components/elements/BaseButton/BaseButton';
import { BaseText } from '@/components/elements/BaseText/BaseText';

const navigationLinks = [
  { id: 1, label: 'Latest-Research', url: '/latest-research' },
  { id: 2, label: 'Experience-Sharing', url: '/experience-sharing' },
  { id: 5, label: 'Forum', url: '/forum' },
  { id: 6, label: 'Community', url: '/community' },

  // { id: 4, label: 'Resources', url: '/resources' },
  // { id: 3, label: 'Program-for-recovery', url: '/recovery-program' },
];
export default function HeaderMobile() {
  const [opened, { toggle }] = useDisclosure(false);
  const useStyles = createStyle();
  const { classes } = useStyles();
  const router = useRouter();
  return (
    <>
      <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" size="lg" />
      {/* Drawer content */}
      <Drawer
        closeOnEscape
        opened={opened}
        onClose={toggle}
        position="left" // You can adjust the position as needed
        size="xs" // Adjust the size based on your design
        overlayProps={{ opacity: 0.5, blur: 4 }}
        withCloseButton
        onClick={toggle}
      >
        {/* Mobile menu items */}
        <Flex direction="column" align="flex-start" className={classes.menuContentFlex}>
          <Link href="/">
            <Image src={Images.talkhealingLogo} width="134.008px" height="24px" mt={20} />
          </Link>
          <Box className={classes.drawerBody}>
            <Stack spacing={30}>
              {navigationLinks.map((link) => (
                <Text size="xl" weight={700} key={link.id} component="a" href={link.url}>
                  {link.label}
                </Text>
              ))}
            </Stack>
            {/* Login and Sign Up buttons */}
            <Group spacing="xl">
              <BaseButton style_variant="filled" color_variant="lime">
                <BaseText
                  size={15}
                  fontWeight_variant={700}
                  onClick={() => {
                    router.push('/login');
                  }}
                  txtkey={'header.login'}
                />
             
              </BaseButton>

              <BaseButton style_variant="filled" color_variant="blue">
                <BaseText
                  size={15}
                  fontWeight_variant={700}
                  onClick={() => {
                    router.push('/signup');
                  }}
                  txtkey={'header.signUp'}
                />
             
              </BaseButton>
            </Group>
          </Box>
        </Flex>
      </Drawer>
      {/* <Header /> */}
    </>
  );
}
