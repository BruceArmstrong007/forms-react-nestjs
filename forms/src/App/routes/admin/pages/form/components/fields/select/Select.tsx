import { HStack, VStack } from "@chakra-ui/layout";
import { Box, Icon, IconButton, Input, InputGroup } from "@chakra-ui/react";
import { useState } from "react";
import { InputRightElement } from "@chakra-ui/input";
import { MdAdd, MdClose } from "react-icons/md";

export const Select = ({ entries, handleAnswer }: any) => {
  const [dropboxes, setDropboxes] = useState(entries);

  const handleInputChange = (event: any, index: number) => {
    const updatedArray = [...dropboxes];
    updatedArray[index] = event.target.value;
    setDropboxes(updatedArray);
    handleAnswer(dropboxes);
  };

  const removeElement = (index: number) => {
    const updatedArray = [...dropboxes];
    updatedArray.splice(index, 1);
    setDropboxes(updatedArray);
    handleAnswer(dropboxes);
  };

  const addElement = () => {
    setDropboxes([...dropboxes, "Option " + (dropboxes.length + 1)]);
    handleAnswer(dropboxes);
  };

  const inputFields = dropboxes.map((value: any, index: any) => (
    <InputGroup key={index} w="full">
      <Input
        w="full"
        type="text"
        value={value}
        variant="flushed"
        onChange={(e) => handleInputChange(e, index)}
      />

      {index !== 0 && (
        <InputRightElement>
          <IconButton
            onClick={() => removeElement(index)}
            aria-label="Remove Option"
          >
            <Icon as={MdClose}></Icon>
          </IconButton>
        </InputRightElement>
      )}
    </InputGroup>
  ));

  return (
    <Box w="full">
      <VStack
        display="flex"
        justifyContent="start"
        alignItems="start"
        spacing={2}
        w="full"
      >
        <HStack w="full">
          <VStack w="full" spacing={2}>
            {inputFields}
          </VStack>
        </HStack>
        <IconButton aria-label="Add Option" onClick={() => addElement()}>
          <Icon as={MdAdd}></Icon>
        </IconButton>
      </VStack>
    </Box>
  );
};
