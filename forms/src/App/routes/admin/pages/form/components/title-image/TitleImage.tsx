import { Box, VStack } from "@chakra-ui/layout";
import { Title } from "../fields/title/Title";
import { useState, useEffect } from "react";
import { Options } from "../../../../../../../shared/utils/interface";
import { Image } from "../fields/image/Image";
import { HStack, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

interface TitleData {
  name: string;
  type: string;
  options: Options;
}

interface ImgData {
  url: string;
}

export const TitleImage = ({ value, getData, deleteData }: any) => {
  const [title, setTitle] = useState<TitleData>(value?.data[0]);
  const [image, setImage] = useState<ImgData>(value?.data[1]);

  useEffect(() => {
    const data = [title, image];
    getData(value?.index, value?.type, data);
  }, [value?.index, value?.type, title, image]);

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
          <Tooltip label="Delete Image" placement="left" closeOnClick={false}>
            <IconButton
              variant="outline"
              isRound={true}
              size="xs"
              colorScheme="white"
              _hover={{ backgroundColor: "red", border: "teal" }}
              aria-label="Delete Image Field"
              onClick={() => deleteData(value?.index)}
            >
              <Icon as={MdDelete}></Icon>
            </IconButton>
          </Tooltip>
        </HStack>
        <Image image={image} setImage={setImage} />
      </VStack>
    </Box>
  );
};
