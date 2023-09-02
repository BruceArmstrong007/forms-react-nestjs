import { Box } from "@chakra-ui/react";
import ReactPlayer from "react-player";

export const Video = ({ video }: any) => {
  return (
    <Box w="full">
        <ReactPlayer width="100%" url={video.url} controls />
    </Box>
  );
};
