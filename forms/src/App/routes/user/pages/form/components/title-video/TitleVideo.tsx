import { Box, VStack } from "@chakra-ui/layout";
import { Title } from "../fields/title/Title";
import { Video } from "../fields/video/Video";
import { HStack } from "@chakra-ui/react";

export const TitleVideo = ({ value }: any) => {
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
        <Video video={value?.data[1]} />
      </VStack>
    </Box>
  );
};
