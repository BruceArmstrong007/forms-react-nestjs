import { HStack, VStack } from "@chakra-ui/layout";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Icon,
  IconButton,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { MdAdd, MdClose } from "react-icons/md";

export const CheckBox = ({ entries, handleAnswer }: any) => {
  const [checkboxes, setCheckboxes] = useState(entries);

  useEffect(() => {
    handleAnswer(checkboxes);
  }, [checkboxes]);

  const handleInputChange = (event: any, index: number) => {
    setCheckboxes((prev: any) => {
      const updatedArray = [...prev];
      updatedArray[index] = event.target.value;
      return updatedArray;
    });
  };

  const removeElement = (index: number) => {
    setCheckboxes((prev: any) => {
      let updatedArray = [...prev];
      updatedArray.splice(index, 1);
      return updatedArray;
    });
  };

  const addElement = () => {
    setCheckboxes((prev: any) => [
      ...prev,
      "Option " + (checkboxes.length + 1),
    ]);
  };

  const inputFields = checkboxes.map((value: any, index: any) => (
    <InputGroup key={index} w="full">
      <InputLeftElement>
        <Checkbox disabled></Checkbox>
      </InputLeftElement>
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
          <CheckboxGroup colorScheme="green">
            <VStack w="full" spacing={2}>
              {inputFields}
            </VStack>
          </CheckboxGroup>
        </HStack>
        <IconButton aria-label="Add Option" onClick={() => addElement()}>
          <Icon as={MdAdd}></Icon>
        </IconButton>
      </VStack>
    </Box>
  );
};
