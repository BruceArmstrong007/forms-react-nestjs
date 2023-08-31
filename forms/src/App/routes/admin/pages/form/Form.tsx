import { Box, Grid, VStack } from "@chakra-ui/layout";
import { TitleDescription } from "./components/title-description/TitleDescription";
import { TitleImage } from "./components/title-image/TitleImage";
import { TitleVideo } from './components/title-video/TitleVideo';
import { Questions } from './components/questions/Questions';

export const Form = () => {
  const getData = (...props: any) => {
    // console.log(props);
  };

  return (
    <Box w="full">
      <VStack
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          w="60%"
          p="20px"
          color="white"
          bg="teal.500"
          rounded="md"
          shadow="md"
        >
          <VStack w="full" spacing={4}>
            <TitleDescription getData={getData} />
            <TitleImage getData={getData} />
            <TitleVideo getData={getData} />
            <Questions getData={getData} />
          </VStack>
        </Grid>
      </VStack>
    </Box>
  );
};
