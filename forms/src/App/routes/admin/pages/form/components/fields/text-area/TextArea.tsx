import { Box, Textarea } from "@chakra-ui/react";

export const TextArea = () => {
  return (
    <Box w="full">
      <Textarea
        disabled
        rows={2}
        fontSize="sm"
        defaultValue="Long Answer"
        variant="flushed"
      />
    </Box>
  );
};
