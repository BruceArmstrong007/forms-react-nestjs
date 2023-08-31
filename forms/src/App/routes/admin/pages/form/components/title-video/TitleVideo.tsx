import { Box, VStack } from "@chakra-ui/layout";
import { Title } from "../fields/title/Title";
import { useState, useEffect } from "react";
import { Options } from "../../../../../../../shared/utils/interface";
import { Video } from "../fields/video/Video";

interface TitleData {
  name: string;
  options: Options;
}

interface VidData {
  url: string;
}

const initialTitleState = {
  type: "title",
  name: "Enter Video Title",
  options: {
    bold: false,
    italic: false,
    underline: false,
  },
};

const initialVidState = {
  type: "video",
  url: "",
};

export const TitleVideo = ({ getData }: any) => {
  const [title, setTitle] = useState<TitleData>(initialTitleState);
  const [video, setVideo] = useState<VidData>(initialVidState);

  useEffect(() => {
    getData(title, video);
  }, [title, video, getData]);

  return (
    <Box w="full">
      <VStack
        w="full"
        display="flex"
        alignItems="start"
        justifyContent="start"
        spacing={1}
      >
        <Title title={title} setTitle={setTitle} />
        <Video video={video} setVideo={setVideo} />
      </VStack>
    </Box>
  );
};
