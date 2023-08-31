import {
  Box,
  Input,
} from "@chakra-ui/react";

export const Text = () => {
  return (
    <Box w="full">
      <Input
        type="text"
        disabled
        fontSize="sm"
        variant="flushed"
        value="Short Answer"
      />
    </Box>
  );
};
