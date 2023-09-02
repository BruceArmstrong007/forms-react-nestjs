import { useState, useEffect } from "react";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import { Question } from "../fields/question/Question";
import { TextArea } from "../fields/text-area/TextArea";
import { Date } from "../fields/date/Date";
import { CheckBox } from "../fields/checkbox/CheckBox";
import { File } from "../fields/file/File";
import { Time } from "../fields/time/Time";
import { Text } from "../fields/text/text";
import { Radio } from "../fields/radio/Radio";
import { Select } from "../fields/select/Select";

interface Answer {
  question: string;
  answer: any;
  index: number;
  option: string;
  required: boolean;
}

export const Questions = ({ value, index, getData }: any) => {
  const [answer, setAnswer] = useState<Answer>({
    question: value?.data[0]?.name,
    answer: value?.data[1]?.option === "checkbox" ? [] : "",
    option: value?.data[1]?.option,
    index: index,
    required: value?.data[1]?.required,
  });

  useEffect(() => {
    getData(answer);
  }, [answer, getData]);

  const handleAnswer = (result: any) => {
    if (Array.isArray(result)) setAnswer({ ...answer, answer: [...result] });
    else setAnswer({ ...answer, answer: result });
  };

  return (
    <Box w="full">
      <VStack
        w="full"
        display="flex"
        alignItems="start"
        justifyContent="start"
        spacing={1}
      >
        <HStack w="full">
          <Question question={value?.data[0]} required={answer.required} />
        </HStack>
        {answer.option === "text" && (
          <Text handleAnswer={handleAnswer} required={answer.required} />
        )}
        {answer.option === "textarea" && (
          <TextArea handleAnswer={handleAnswer} required={answer.required} />
        )}
        {answer.option === "date" && (
          <Date handleAnswer={handleAnswer} required={answer.required} />
        )}
        {answer.option === "time" && (
          <Time handleAnswer={handleAnswer} required={answer.required} />
        )}
        {answer.option === "checkbox" && (
          <CheckBox
            entries={value?.data[1]?.entries}
            handleAnswer={handleAnswer}
            required={answer.required}
          />
        )}
        {answer.option === "radio" && (
          <Radio
            entries={value?.data[1]?.entries}
            handleAnswer={handleAnswer}
            required={answer.required}
          />
        )}
        {answer.option === "select" && (
          <Select
            entries={value?.data[1]?.entries}
            handleAnswer={handleAnswer}
            required={answer.required}
          />
        )}
        {answer.option === "file" && (
          <File
            entries={value?.data[1]?.entries[0]?.options}
            handleAnswer={handleAnswer}
            required={answer.required}
          />
        )}
      </VStack>
    </Box>
  );
};
