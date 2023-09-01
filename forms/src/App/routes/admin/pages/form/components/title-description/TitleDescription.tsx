import { Box, VStack, HStack } from "@chakra-ui/layout";
import { Title } from "../fields/title/Title";
import { useState, useEffect } from "react";
import { Description } from "../fields/description/description";
import { Options } from "../../../../../../../shared/utils/interface";
import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

interface Data {
  name: string;
  index: number;
  type: string;
  options: Options;
}

export const TitleDescription = ({ value, getData, deleteData }: any) => {
  
  const [title, setTitle] = useState<Data>(value?.data[0]);
  const [description, setDescription] = useState<Data>(value?.data[1]);

  useEffect(() => {
    const data = [title, description];
    getData(value?.index, value?.type, data);
  }, [title, description, value, getData]);

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
          <Tooltip
            label="Delete Title Description"
            placement="left"
            closeOnClick={false}
          >
            <IconButton
              onClick={() => deleteData(value?.index)}
              variant="outline"
              isRound={true}
              size="xs"
              colorScheme="white"
              _hover={{ backgroundColor: "red", border: "teal" }}
              aria-label="Delete Title Description Field"
            >
              <Icon as={MdDelete}></Icon>
            </IconButton>
          </Tooltip>
        </HStack>
        <Description
          description={description}
          setDescription={setDescription}
        ></Description>
      </VStack>
    </Box>
  );
};
