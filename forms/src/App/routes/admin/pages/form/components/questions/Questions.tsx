import { useState, useEffect } from "react";
import { Options } from "../../../../../../../shared/utils/interface";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import { Question } from "../fields/question/Question";
import { Select } from "@chakra-ui/select";
import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Text } from "../fields/text/text";
import { TextArea } from "../fields/text-area/TextArea";
import { Date } from "../fields/date/Date";
import { Time } from "../fields/time/Time";
import { CheckBox } from "../fields/checkbox/CheckBox";
import { Radio } from "../fields/radio/Radio";
import { Select as DropBox } from "../fields/select/Select";
import { MdDelete } from "react-icons/md";
import { Tooltip } from "@chakra-ui/react";

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

export const Questions = ({ value, getData, deleteData }: any) => {
  const [question, setQuestion] = useState<QuestionData>(value?.data[0]);
  const [answer, setAnswer] = useState<AnswerData>(value?.data[1]);

  

  useEffect(() => {
    const data = [question, answer];
    getData(value?.index, value?.type, data);
  }, [value, question, answer, getData]);

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
          <Tooltip
            label="Delete Questions"
            placement="left"
            closeOnClick={false}
          >
            <IconButton
              aria-label="Delete Questions"
              variant="outline"
              isRound={true}
              size="xs"
              colorScheme="white"
              _hover={{ backgroundColor: "red", border: "teal" }}
              onClick={() => deleteData(value?.index)}
            >
              <Icon as={MdDelete}></Icon>
            </IconButton>
          </Tooltip>
        </HStack>
        {answer.option === "text" && <Text />}
        {answer.option === "textarea" && <TextArea />}
        {answer.option === "date" && <Date />}
        {answer.option === "time" && <Time />}
        {answer.option === "checkbox" && (
          <CheckBox entries={answer.entries} handleAnswer={handleAnswer} />
        )}
        {answer.option === "radio" && <Radio entries={answer.entries} handleAnswer={handleAnswer} />}
        {answer.option === "select" && <DropBox entries={answer.entries} handleAnswer={handleAnswer} />}
      </VStack>
    </Box>
  );
};
