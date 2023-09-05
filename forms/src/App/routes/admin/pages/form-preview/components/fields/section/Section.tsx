import { Box, Heading } from "@chakra-ui/react";

export const Section = ({ section }: any) => {

  return (
    <Box w="full">
      <Heading
        as="h3"
        size="md"
        {...(section?.options?.italic === true
          ? { fontStyle: "italic" }
          : null)}
        {...(section?.options?.bold === true ? { fontWeight: "bold" } : null)}
        {...(section?.options?.underline === true
          ? { textDecoration: "underline" }
          : null)}
      >
        {section.name}
      </Heading>
    </Box>
  );
};
