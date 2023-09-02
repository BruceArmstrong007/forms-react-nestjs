import { VStack } from "@chakra-ui/layout";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const CheckBox = ({ entries, handleAnswer, required }: any) => {
  const [input, setInput] = useState("");
  const isError = required && input === "";
  useEffect(() => {
    handleAnswer(input)
  },[]);
  const inputFields = entries.map((value: any, index: any) => (
    <Checkbox key={index} value={value}>
      {value}
    </Checkbox>
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
        <FormControl isRequired={required} isInvalid={isError}>
          <CheckboxGroup
          onChange={(e: any) => {
              handleAnswer(e);
              setInput(e);
            }}
            colorScheme="green"
          >
            {inputFields}
          </CheckboxGroup>
          {isError && <FormErrorMessage>Required.</FormErrorMessage>}
        </FormControl>
      </VStack>
    </Box>
  );
};
