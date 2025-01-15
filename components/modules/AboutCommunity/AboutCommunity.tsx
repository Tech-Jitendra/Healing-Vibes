import { IconCake, IconDots, IconHeart } from '@tabler/icons-react';
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  Title,
  Menu,
  rem,
  useMantineTheme,
  Stack,
  Flex,
} from '@mantine/core';
import { BaseButton } from '@/components/elements/BaseButton/BaseButton';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { createStyle } from './AboutCommunity.style';
import router from 'next/router';

const mockdata = {
  title: 'Cancer season 2020',
  members: '811',
  ranking: 'Top 1%',
  createdOn: 'Oct 29 2009',
  online: '1.6',
  communityName: 'Cancer Fighting',
};

function AboutCommunity() {
  const theme = useMantineTheme();
  const useStyles = createStyle();
  const { classes } = useStyles();
  const { members, ranking, title, createdOn, online, communityName } = mockdata;

  return (
    <Card withBorder radius="md" p="md" className={classes.cardContainer}>
      {/**Card header  */}
      <Card.Section inheritPadding py="xs">
        <Flex justify={'space-between'} align="center">
          <BaseText fontWeight_variant={700} size_variant="md">
            About Community
          </BaseText>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDots style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item>
                <Text fw={'sm'} size={'md'}>
                  Add to Feed
                </Text>
              </Menu.Item>
              <Menu.Item>
                <Text fw={'sm'} size={'md'}>
                  Add to Favourites
                </Text>
              </Menu.Item>
              <Menu.Item color="red">
                <Text fw={'sm'} size={'md'}>
                  Mute {communityName}
                </Text>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Card.Section>

      <Card.Section inheritPadding py="xs">
        <Stack>
          <BaseText fontWeight_variant={600} size_variant={'md'}>
            {title}
          </BaseText>
          <Flex gap={5} align="center">
            <IconCake />
            <BaseText fontWeight_variant={400} size_variant={'sm'}>
              {`Created ${createdOn}`}
            </BaseText>
          </Flex>
        </Stack>
      </Card.Section>

      <Card.Section withBorder inheritPadding py={'xs'}>
        <Flex align={'center'} justify="space-between">
          <Flex direction={'column'} gap={5}>
            <BaseText fontWeight_variant={600}>{`${members}k`}</BaseText>
            <BaseText fontWeight_variant={400} size_variant={'xs'}>
              Members
            </BaseText>
          </Flex>
          <Flex direction={'column'} gap={5}>
            <BaseText fontWeight_variant={600}>
              <Flex gap={2} align={'center'}>
                {' '}
                <Badge
                  sx={{
                    borderRadius: '100%',
                    background: theme.colors.green[0],
                   
                    // width: 5,
                  }}
                />
                {`${online}k`}
              </Flex>
            </BaseText>
            <BaseText fontWeight_variant={400} size_variant={'xs'}>
              Socializing
            </BaseText>
          </Flex>
          <Flex direction={'column'} gap={5}>
            <BaseText fontWeight_variant={600}>{ranking}</BaseText>
            <BaseText fontWeight_variant={400} size_variant={'xs'}>
              Ranked By Size
            </BaseText>
          </Flex>
        </Flex>
      </Card.Section>
      {/* create post */}
      <Card.Section withBorder p="md">
        <BaseButton style_variant="filled" color_variant="blue" fullWidth onClick={()=>{
          router.push(`${communityName.toLowerCase().replace(" ","-")}/submit`)
        }}>
          <Text>Create post</Text>
        </BaseButton>
      </Card.Section>
    </Card>
  );
}

export default AboutCommunity;
