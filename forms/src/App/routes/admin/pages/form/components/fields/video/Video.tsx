import { Box, Collapse } from "@chakra-ui/react";
import { Controls } from "./Controls";
import ReactPlayer from "react-player";

export const Video = ({ video, setVideo }: any) => {
  const urlChange = (url: string) => {
    setVideo((prev: any) => {
      return {
        ...prev,
        url: url,
      };
    });
  };
  return (
    <Box w="full">
      <Controls urlChange={urlChange} isControls={true} url={video.url} />

      <Collapse in={video.url ? true : false} animateOpacity>
        <ReactPlayer width="100%" url={video.url} controls />
      </Collapse>
    </Box>
  );
};
