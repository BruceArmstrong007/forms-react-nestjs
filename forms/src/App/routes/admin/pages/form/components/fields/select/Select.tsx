import { HStack, VStack } from "@chakra-ui/layout";
import { Box, Icon, IconButton, Input, InputGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { InputRightElement } from "@chakra-ui/input";
import { MdAdd, MdClose } from "react-icons/md";

export const Select = ({ entries, handleAnswer }: any) => {
  const [dropboxes, setDropboxes] = useState(entries);

  useEffect(() => {
    handleAnswer(dropboxes);
  }, [dropboxes]);

  const handleInputChange = (event: any, index: number) => {
    setDropboxes((prev: any) => {
      const updatedArray = [...prev];
      updatedArray[index] = event.target.value;
      return updatedArray;
    });
  };

  const removeElement = (index: number) => {
    setDropboxes((prev: any) => {
      const updatedArray = prev;
      updatedArray.splice(index, 1);
      return updatedArray;
    });
  };

  const addElement = () => {
    setDropboxes((prev: any) => [...prev, "Option " + (prev.length + 1)]);
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
