import { Box, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const Date = ({ handleAnswer, required }: any) => {
  const [input, setInput] = useState("");
  const isError = required && input === "";
  useEffect(() => {
    handleAnswer(input)
  },[input]);
  return (
    <Box w="full">
      <FormControl isRequired={required} isInvalid={isError}>
        <Input
          type="date"
          variant="flushed"
          required={required}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        {isError && <FormErrorMessage>Required.</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};
