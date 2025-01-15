import { Box, Button, Container } from '@mantine/core';
import { useState } from 'react';
import { createStyle } from './Mobiletopics.styles';

interface MobiletopicsProps {
  topicsData: Array<String>;
}

export default function Mobiletopics({ topicsData }: MobiletopicsProps) {
  const useStyles = createStyle();
  const { classes } = useStyles();
  const [selectedDiseases, setSelectedDiseases] = useState<Array<String>>([]);
  // console.log(selectedDiseases);
  const handleSelectedDiseases = (disease: String) => {
    setSelectedDiseases((prevState: any) => [...prevState, disease]);
  };
  return (
    <Container className={classes.container}>
      <Box>
        {topicsData.map((topic, index) => (
          <Button
            key={index}
            variant="default"
            className={classes.btn}
            onClick={() => handleSelectedDiseases(topic)}
          >
            {topic}
          </Button>
        ))}
      </Box>
    </Container>
  );
}
