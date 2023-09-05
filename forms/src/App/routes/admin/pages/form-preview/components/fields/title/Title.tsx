import { Box, Heading } from "@chakra-ui/react";

export const Title = ({ title }: any) => {
  return (
    <Box w="full">
      <Heading
        as="h3"
        size="sm"
        {...(title.options.italic === true ? { fontStyle: "italic" } : {})}
        {...(title.options.bold === true ? { fontWeight: "bold" } : {})}
        {...(title.options.underline === true
          ? { textDecoration: "underline" }
          : {})}
      >
        {title.name}
      </Heading>
    </Box>
  );
};
