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
import { useState } from "react";
import { InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { MdAdd, MdClose } from "react-icons/md";

export const CheckBox = ({ handleAnswer }: any) => {
  const [checkboxes, setCheckboxes] = useState(["Option"]);

  const handleInputChange = (event: any, index: number) => {
    const updatedArray = [...checkboxes];
    updatedArray[index] = event.target.value;
    setCheckboxes(updatedArray);
    handleAnswer(checkboxes);
  };

  const removeElement = (index: number) => {
    const updatedArray = [...checkboxes];
    updatedArray.splice(index, 1);
    setCheckboxes(updatedArray);
    handleAnswer(checkboxes);
  };

  const addElement = () => {
    setCheckboxes([...checkboxes, "Option " +(checkboxes.length + 1)]);
    handleAnswer(checkboxes)
  };

  const inputFields = checkboxes.map((value, index) => (
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
