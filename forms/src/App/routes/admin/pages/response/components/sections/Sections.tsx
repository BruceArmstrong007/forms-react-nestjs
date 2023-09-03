import { Box } from "@chakra-ui/layout";
import { Questions } from "../questions/Questions";

export const Sections = ({ sections }: any) => {
  console.log(sections);
  
  const renderSections = sections?.map((value: any, index: any) => {
    return (
      <Questions key={index} questions={value.questions}></Questions>
    );
  });
  return <Box w="full">{renderSections}</Box>;
};
