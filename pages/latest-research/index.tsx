/* eslint-disable import/extensions */
import { Flex, Container, useMantineTheme, Box } from '@mantine/core';
import React, { useState } from 'react';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { createStyle } from './Latest-research.style';

import Header from '@/components/modules/Header/Header';

import ResearchCard from '@/components/modules/ResearchCard';
import PageSearchBox from '@/components/modules/PageSearchbox';
import TopicsBox from '@/components/modules/TopicsBox';
import NoDataFound from '@/components/modules/NoDataFound/NoDataFound';

const researchData = [
  {
    id: 1,
    title: 'Genes diversity curing Cancer',
    content: 'Coronary Artery Disease was very frightening and a life-threating experience for me.',
    datePosted: 'Sept 2021',
    author: 'Bryce Walker',
  },
  {
    id: 2,
    title: 'Research title lorem ipsum dolor sit',
    content:
      'S Arthritis Hypertension (High Blood Pressure) magna aliqua. Arthritis ad minim veniam, Influenza (Flu) exercitation ullamco Cancer nisi ut aliquip ex ea commodo consequat...',
    datePosted: 'Mar 2019',
    author: 'Andreas Walker',
  },
  {
    id: 3,
    title: 'Title for research lorem ipsum dolor sit',
    content:
      "Sed do Diabetes Stroke ut labore Alzheimer's Disease aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...",
    datePosted: 'Mar 2023',
    author: 'John Doe',
  },
];

// console.log("jsondata---", JSON.stringify(researchData, null, 1));

const filteredResearchData = (text: any) => {
  const data = researchData.filter((item) =>
    [item.author, item.content, item.datePosted, item.title]
      .join(' ')
      .toLowerCase()
      .includes(text.toLowerCase())
  );

  return data;
};

const RenderResearchCards = (props: { data: any }) => {
  const { data } = props;
  // console.log(data);
  return data.map((researchItem: any) => (
    <ResearchCard research={researchItem} key={researchItem.id} />
  ));
};

export default function LatestResearch() {
  const theme = useMantineTheme();

  const useStyles = createStyle();
  const { classes } = useStyles();
  const [searchText, setSearchText] = useState<any>(' ');

  const result = filteredResearchData(searchText);

  const dataToRenderFrom = searchText && searchText.length !== 0 ? result : researchData;

  const FilteredcontentToRender = () => {
    return dataToRenderFrom.length !== 0 ? <RenderResearchCards data={result} /> : <NoDataFound />;
  };

  return (
    <>
      <Container maw="1250px">
        <Box className={classes.container}>
          <BaseText c={theme.colors.black[9]} className={classes.heading}>
            Lastest Research
          </BaseText>
          <Flex className={classes.mainItems}>
            <TopicsBox />
            <Flex direction="column" gap="sm">
              <PageSearchBox
                num={291}
                type="research"
                onSearchChange={(e: any) => {
                  setSearchText(e.target.value);
                }}
                searchText={searchText}
              />
              {searchText ? (
                <FilteredcontentToRender />
              ) : (
                <RenderResearchCards data={researchData} />
              )}
            </Flex>
          </Flex>
        </Box>
      </Container>
    </>
  );
}
