import { Box, VStack, HStack } from "@chakra-ui/layout";
import { Title } from "../fields/title/Title";
import { Description } from "../fields/description/description";

export const TitleDescription = ({ value }: any) => {
  return (
    <Box w="full">
      <VStack
        w="full"
        display="flex"
        alignItems="start"
        justifyContent="start"
        spacing={1}
      >
        <HStack w="full">
          <Title title={value?.data[0]}></Title>
        </HStack>
        <Description description={value?.data[1]}></Description>
      </VStack>
    </Box>
  );
};
