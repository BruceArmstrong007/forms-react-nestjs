import { Box, VStack } from "@chakra-ui/layout";
import { Title } from "../fields/title/Title";
import { Image } from "../fields/image/Image";
import { HStack } from "@chakra-ui/react";

export const TitleImage = ({ value }: any) => {
  
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
        <Image image={value?.data[1]}/>
      </VStack>
    </Box>
  );
};
