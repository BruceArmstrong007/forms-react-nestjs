import { Box, Textarea, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const TextArea = ({ handleAnswer, required }: any) => {
  const [input, setInput] = useState("");
  const isError = required && input === "";
  useEffect(() => {
    handleAnswer(input)
  },[]);
  return (
    <Box w="full">
      <FormControl isRequired={required} isInvalid={isError}>
        <Textarea
          rows={2}
          fontSize="sm"
          required={required}
          value={input}
          variant="flushed"
          onChange={(e) => {setInput(e.target.value);handleAnswer(e.target.value)}}
        />
        {isError && <FormErrorMessage>Required.</FormErrorMessage>}

      </FormControl>
    </Box>
  );
};
