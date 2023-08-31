import { Box, VStack } from "@chakra-ui/layout";
import { Title } from "../fields/title/Title";
import { useState, useEffect } from "react";
import { Description } from "../fields/description/description";
import { Options } from "../../../../../../../shared/utils/interface";

interface Data {
  name: string;
  type: string;
  options: Options;
}

const initialTitleState = {
  name: "Enter Title",
  type: "title",
  options: {
    bold: false,
    italic: false,
    underline: false,
  },
};

const initialDescriptionState = {
  name: "Enter Description",
  type: "description",
  options: {
    bold: false,
    italic: false,
    underline: false,
  },
};

export const TitleDescription = ({ getData }: any) => {
  const [title, setTitle] = useState<Data>(initialTitleState);
  const [description, setDescription] = useState<Data>(initialDescriptionState);

  useEffect(() => {
    getData(title, description);
  }, [title, description, getData]);

  return (
    <Box w="full">
      <VStack
        w="full"
        display="flex"
        alignItems="start"
        justifyContent="start"
        spacing={1}
      >
        <Title title={title} setTitle={setTitle}></Title>
        <Description
          description={description}
          setDescription={setDescription}
        ></Description>
      </VStack>
    </Box>
  );
};
