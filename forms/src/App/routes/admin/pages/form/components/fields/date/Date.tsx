import { Box, Input } from "@chakra-ui/react";

export const Date = () => {
  return (
    <Box w="full">
      <Input
        disabled
        type="date"
        variant="flushed"
      />
    </Box>
  );
};
