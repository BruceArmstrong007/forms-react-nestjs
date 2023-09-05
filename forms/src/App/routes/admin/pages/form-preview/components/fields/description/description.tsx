import { Box, Text } from "@chakra-ui/react";

export const Description = ({ description }: any) => {
  return (
    <Box w="full">
      <Text as="p" size="md">
        {description?.name}
      </Text>
    </Box>
  );
};
