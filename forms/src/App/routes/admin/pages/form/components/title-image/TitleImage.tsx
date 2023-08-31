import { Box, VStack } from "@chakra-ui/layout";
import { Title } from "../fields/title/Title";
import { useState, useEffect } from "react";
import { Options } from "../../../../../../../shared/utils/interface";
import { Image } from "../fields/image/Image";

interface TitleData {
  name: string;
  type: string;
  options: Options;
}

interface ImgData {
  url: string;
}

const initialTitleState = {
  name: "Enter Image Title",
  type: "title",
  options: {
      bold: false,
      italic: false,
      underline: false
  }
}


const initialImgState = {
  url: "",
  type: "image",
};

export const TitleImage = ({ getData }: any) => {
  const [title, setTitle] = useState<TitleData>(initialTitleState);
  const [image, setImage] = useState<ImgData>(initialImgState);

  useEffect(() => {
    getData(title, image);
  }, [title, image, getData]);

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
        <Image image={image} setImage={setImage} />
      </VStack>
    </Box>
  );
};
