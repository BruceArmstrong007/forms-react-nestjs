import { Box, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const Time = ({ handleAnswer, required }: any) => {
  const [input, setInput] = useState("");
  const isError = required && input === "";
  useEffect(() => {
    handleAnswer(input)
  },[input]);
  return (
    <Box w="full">
      <FormControl isRequired={required} isInvalid={isError}>
        <Input
          type="time"
          variant="flushed"
          value={input}
          required={required}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        {isError && <FormErrorMessage>Required.</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};
