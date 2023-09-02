import { Box, Image as Img } from "@chakra-ui/react";
import PlaceHolder from "./placeholder.jpg";

export const Image = ({ image }: any) => {
  return (
    <Box w="full">
      <Img
        boxSize="full"
        fallbackSrc={PlaceHolder}
        src={image.url}
        alt="Dan Abramov"
      />
    </Box>
  );
};
