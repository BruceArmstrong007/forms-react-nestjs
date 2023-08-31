import { useState, useEffect } from "react";
import { Options } from "../../../../../../../shared/utils/interface";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import { Question } from "../fields/question/Question";
import { Select } from "@chakra-ui/select";
import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { FaImage } from "react-icons/fa";
import { Text } from "../fields/text/text";
import { TextArea } from "../fields/text-area/TextArea";
import { Date } from "../fields/date/Date";
import { Time } from "../fields/time/Time";
import { CheckBox } from "../fields/checkbox/CheckBox";
import { Radio } from "../fields/radio/Radio";
import { Select as DropBox } from "../fields/select/Select";

interface QuestionData {
  name: string;
  type: string;
  options: Options;
}
interface AnswerData {
  type: string;
  option: string;
  entries: any[];
}

const initialQuestionState = {
  name: "Enter Question",
  type: "question",
  options: {
    bold: false,
    italic: false,
    underline: false,
  },
};

const initialAnswerState = {
  type: "answer",
  option: "text",
  entries: [],
};

export const Questions = ({ getData }: any) => {
  const [question, setQuestion] = useState<QuestionData>(initialQuestionState);
  const [answer, setAnswer] = useState<AnswerData>(initialAnswerState);

  useEffect(() => {
    getData(question, answer);
  }, [question, answer, getData]);

  const handleAnswer = (entries: any[]) => {
    setAnswer({ ...answer, entries: entries });
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
          <Question question={question} setQuestion={setQuestion} />
          <IconButton aria-label="Add Image">
            <Icon as={FaImage}></Icon>
          </IconButton>
          <Select
            defaultValue={answer.option}
            onChange={(e) => setAnswer({ ...answer, option: e.target.value })}
            variant="flushed"
          >
            <option value="text">Short Answer</option>
            <option value="textarea">Long Answer</option>
            <option value="date">Date</option>
            <option value="time">Time</option>
            <option value="select">Dropdown</option>
            <option value="checkbox">Check Boxes</option>
            <option value="radio">Multiple Choice</option>
          </Select>
        </HStack>
        {answer.option === "text" && <Text />}
        {answer.option === "textarea" && <TextArea />}
        {answer.option === "date" && <Date />}
        {answer.option === "time" && <Time />}
        {answer.option === "checkbox" && (
          <CheckBox handleAnswer={handleAnswer} />
        )}
        {answer.option === "radio" && <Radio handleAnswer={handleAnswer} />}
        {answer.option === "select" && <DropBox handleAnswer={handleAnswer} />}
      </VStack>
    </Box>
  );
};
