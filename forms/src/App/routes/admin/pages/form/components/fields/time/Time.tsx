import { Box, Input } from "@chakra-ui/react";

export const Time = () => {
  return (
    <Box w="full">
      <Input
        disabled
        type="time"
        variant="flushed"
      />
    </Box>
  );
};
