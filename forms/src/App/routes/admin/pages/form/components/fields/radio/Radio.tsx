import { HStack, VStack } from "@chakra-ui/layout";
import {
  Box,
  Radio as RadioBox,
  RadioGroup,
  Icon,
  IconButton,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import { InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { MdAdd, MdClose } from "react-icons/md";

export const Radio = ({ entries, handleAnswer }: any) => {
  const [radioboxes, setRadioboxes] = useState(entries);

  const handleInputChange = (event: any, index: number) => {
    const updatedArray = [...radioboxes];
    updatedArray[index] = event.target.value;
    setRadioboxes(updatedArray);
    handleAnswer(radioboxes);
  };

  const removeElement = (index: number) => {
    const updatedArray = [...radioboxes];
    updatedArray.splice(index, 1);
    setRadioboxes(updatedArray);
    handleAnswer(radioboxes);
  };

  const addElement = () => {
    setRadioboxes([...radioboxes, "Option " + (radioboxes.length + 1)]);
    handleAnswer(radioboxes);
  };

  const inputFields = radioboxes.map((value: any, index: any) => (
    <InputGroup key={index} w="full">
      <InputLeftElement>
        <RadioBox disabled></RadioBox>
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
          <RadioGroup w="full" colorScheme="green">
            <VStack w="full" spacing={2}>
              {inputFields}
            </VStack>
          </RadioGroup>
        </HStack>
        <IconButton aria-label="Add Option" onClick={() => addElement()}>
          <Icon as={MdAdd}></Icon>
        </IconButton>
      </VStack>
    </Box>
  );
};
