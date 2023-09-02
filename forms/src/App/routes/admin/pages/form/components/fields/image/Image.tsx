import { Box, Image as Img, Collapse } from "@chakra-ui/react";
import PlaceHolder from "./placeholder.jpg";
import { Controls } from "./Controls";

export const Image = ({ image, setImage }: any) => {
  const urlChange = (url: string) => {
    setImage((prev: any) => {
      return {
        ...prev,
        url: url,
      };
    });
  };
  return (
    <Box w="full">
      <Controls urlChange={urlChange} isControls={true} url={image.url} />

      <Collapse in={image.url ? true : false} animateOpacity>
        <Img
          boxSize="full"
          fallbackSrc={PlaceHolder}
          src={image.url}
          alt="Dan Abramov"
        />
      </Collapse>
    </Box>
  );
};
