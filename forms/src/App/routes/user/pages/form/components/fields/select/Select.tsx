import { VStack } from "@chakra-ui/layout";
import { Box, Select as Dropbox, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const Select = ({ entries, handleAnswer, required }: any) => {
  const [input, setInput] = useState("");
  const isError = required && input === "";
  useEffect(() => {
    handleAnswer(input)
  },[]);
  const inputFields = entries?.map((value: any, index: any) => (
    <option key={index} value={value}>
      {value}
    </option>
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
          <Dropbox
            required={required}
            onChange={(e) => {
              setInput(e.target.value);
              handleAnswer(e.target.value);
            }}
            variant="flushed"
            value={input}
            placeholder="Select an option."
          >
            {inputFields}
          </Dropbox>
          {isError && <FormErrorMessage>Required.</FormErrorMessage>}
        </FormControl>
      </VStack>
    </Box>
  );
};
