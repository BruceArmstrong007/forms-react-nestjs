import { VStack } from "@chakra-ui/layout";
import {
  Box,
  FormControl,
  FormErrorMessage,
  Radio as RadioBox,
  RadioGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const Radio = ({ entries, handleAnswer, required }: any) => {
  const [input, setInput] = useState("");
  const isError = required && input === "";
  useEffect(() => {
    handleAnswer(input)
  },[]);
  const inputFields = entries?.map((value: any, index: any) => (
    <RadioBox key={index} value={value}>
      {value}
    </RadioBox>
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
        <FormControl isRequired={required}  isInvalid={isError}>
          <RadioGroup
            w="full"
            value={input}
            onChange={(e) => {
              setInput(e);
              handleAnswer(e);
            }}
            colorScheme="green"
          >
            {inputFields}
          </RadioGroup>
          {isError && <FormErrorMessage>Required.</FormErrorMessage>}
        </FormControl>
      </VStack>
    </Box>
  );
};
