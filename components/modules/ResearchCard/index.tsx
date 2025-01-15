/* eslint-disable import/extensions */
import { Button, Container, Flex, Group, Text, useMantineTheme } from '@mantine/core';
import React from 'react';
import Image from 'next/image';

import { createStyle } from './ResearchCard.style';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { BaseButton } from '@/components/elements/BaseButton/BaseButton';

interface ResearchCardProps {
  research: {
    title: string;
    content: string;
    datePosted: string;
    author: string;
  };
}

const ResearchCard: React.FC<ResearchCardProps> = ({ research }) => {
  const theme = useMantineTheme();

  const useStyles = createStyle();
  const { classes } = useStyles();
  return (
    <Container className={classes.container}>
      <Group dir="column" spacing="6px">
        <BaseText size_variant="xl" color_variant={theme.colors.black} fontWeight_variant={600}>
          {research.title}
        </BaseText>
        <BaseText size_variant="sm" color_variant={theme.colors.black} fontWeight_variant={400}>
          {research.content}
        </BaseText>
      </Group>
      <Flex className={classes.detailBtns}>
        <Group className={classes.btnGroup}>
          <Button className={classes.userPostedButton}>
            <Flex justify="center" align="center" gap="xs">
              <Image src="/icons/mdi_eye_icon.png" alt="eyeIcon" width="16" height="16" />
              <Text>{research.author}</Text>
            </Flex>
          </Button>
          <Button className={classes.datePostedtext}>
            <Flex justify="center" align="center" gap="xs">
              <Image
                src="/icons/zondicons_calendar.png"
                alt="calenderIcon"
                width="14"
                height="14"
              />
              <Text>{research.datePosted}</Text>
            </Flex>
          </Button>
        </Group>
        <BaseButton color_variant="blue" style_variant="filled" mt="lg">
          See details
        </BaseButton>
      </Flex>
    </Container>
  );
};
export default ResearchCard;
