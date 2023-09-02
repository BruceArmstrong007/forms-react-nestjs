import { Box, VStack } from "@chakra-ui/layout";
import { Title } from "../fields/title/Title";
import { useState, useEffect } from "react";
import { Options } from "../../../../../../../shared/utils/interface";
import { Video } from "../fields/video/Video";
import { HStack, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

interface TitleData {
  name: string;
  options: Options;
}

interface VidData {
  url: string;
}

export const TitleVideo = ({ value, getData, deleteData }: any) => {
  const [title, setTitle] = useState<TitleData>(value?.data[0]);
  const [video, setVideo] = useState<VidData>(value?.data[1]);

  useEffect(() => {
    const data = [title, video];
    getData(value?.index, value?.type, data);
  }, [value?.index, value?.type, title, video, getData]);

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
          <Title title={title} setTitle={setTitle}></Title>
          <Tooltip label="Delete Video" placement="left" closeOnClick={false}>
            <IconButton
              variant="outline"
              isRound={true}
              size="xs"
              colorScheme="white"
              _hover={{ backgroundColor: "red", border: "teal" }}
              aria-label="Delete Video Field"
              onClick={() => deleteData(value?.index)}
            >
              <Icon as={MdDelete}></Icon>
            </IconButton>
          </Tooltip>
        </HStack>
        <Video video={video} setVideo={setVideo} />
      </VStack>
    </Box>
  );
};
