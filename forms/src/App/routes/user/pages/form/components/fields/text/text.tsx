import { Box, Input, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const Text = ({ handleAnswer, required }: any) => {
  const [input, setInput] = useState("");
  const isError = input === ''
  useEffect(() => {
    handleAnswer(input)
  },[input]);
  return (
    <Box w="full">
      <FormControl isRequired={required} isInvalid={isError}>
        <Input
          type="text"
          fontSize="sm"
          value={input}
          required={required}
          variant="flushed"
          onChange={(e) => {setInput(e.target.value)}}
        />
        {isError && <FormErrorMessage>Required.</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};
