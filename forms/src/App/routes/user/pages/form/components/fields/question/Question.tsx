import { Box, Heading } from "@chakra-ui/react";

export const Question = ({ question, required }: any) => {
  return (
    <Box w="full">
      <Heading
        as="h3"
        size="sm"
        {...(question.options.italic === true ? { fontStyle: "italic" } : {})}
        {...(question.options.bold === true ? { fontWeight: "bold" } : {})}
        {...(question.options.underline === true
          ? { textDecoration: "underline" }
          : {})}
      >
        {question.name + " "}
        {required && <span style={{ color: "red" }}> * </span>}
      </Heading>
    </Box>
  );
};
