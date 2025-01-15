/* eslint-disable import/extensions */
import { useState } from 'react';
import { Collapse, Container, Flex, Title, useMantineTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { typography } from '@/themes/Mantine/typography';
import { useStores } from '@/models';
import { createStyle } from './TopicsBox.styles';
import Mobiletopics from '../MobileTopics';

const commonDiseases = [
  'Hypertension (High Blood Pressure)',
  'Diabetes',
  'Coronary Artery Disease ',
  'Stroke',
  'Cancer',
  'Asthma',
  'Chronic Obstructive Pulmonary Disease ',
  "Alzheimer's Disease",
  'Arthritis',
  'Influenza (Flu)',
];

export default function TopicsBox() {
  const { i18nStore } = useStores();
  const theme = useMantineTheme();
  const useStyles = createStyle();
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const responsiveTab = useMediaQuery('(max-width: 74.25em)');
  const responsiveMobile = useMediaQuery('(max-width: 61.9375em)');
  const [selectedDiseases, setSelectedDiseases] = useState<Array<string>>([]);
  // const handleSelectedDiseases = (disease: string) => {
  //   setSelectedDiseases((prevState: any) => [...prevState, disease]);
  //   console.log('selected diseases', selectedDiseases);
  // };
  // const topicSelectingDiseases = (disease: string) => {
  //   setSearchText((prevState:any) => (...prevState, setSearchText(prevState)))
  // }

  // const [searchText, setSearchText] = useState<Array<string>>(commonDiseases);
  // const selectingTopicsText = (e: any) => {
  //   return setSearchText(e.target.value);
  // };
  // console.log(selectedDiseases);
  return (
    <>
      {responsiveMobile ? (
        <Mobiletopics topicsData={commonDiseases} />
      ) : responsiveTab ? (
        <Container className={classes.topicsLayout}>
          {/**Title */}
          <Title order={2}>
            <BaseText fontWeight_variant={700} size_variant="md" onClick={toggle}>
              Topics
            </BaseText>
          </Title>
          {/**Diseases */}
          <Collapse in={opened} transitionDuration={1000} transitionTimingFunction="linear">
            <Flex direction="column" mt={27} gap="10px">
              {commonDiseases.map((item, index) => (
                <BaseText
                  key={index}
                  size_variant="sm"
                  style={typography.inputFieldText[i18nStore.getCurrentLanguage()].i1}
                  className={classes.topicsText}
                  // onClick={() => {
                  //   handleSelectedDiseases(item);
                  // }}
                >
                  {item}
                </BaseText>
              ))}
            </Flex>
          </Collapse>
        </Container>
      ) : (
        <Container className={classes.topicsLayout}>
          {/**Title */}
          <Title order={2}>
            <BaseText fontWeight_variant={600} size_variant="md">
              Topics
            </BaseText>
          </Title>
          {/**Diseases */}
          <Flex direction="column" mt={27} gap="10px">
            {commonDiseases.map((item, index) => (
              <BaseText
                key={index}
                size_variant="sm"
                style={typography.inputFieldText[i18nStore.getCurrentLanguage()].i1}
                className={classes.topicsText}
                // onClick={() => {
                //   handleSelectedDiseases(item);
                //   setSearchText([...searchText, item[index]]);
                //   console.log("topics selected search text", searchText);
                // }}
              >
                {item}
              </BaseText>
            ))}
          </Flex>
        </Container>
      )}
    </>
  );
}
