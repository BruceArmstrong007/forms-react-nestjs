import {
  Box,
  Collapse,
  Editable,
  EditableInput,
  EditablePreview,
  Input,
} from "@chakra-ui/react";
import { Controls } from "./Controls";
import { useState } from "react";

export const Question = ({ question, setQuestion }: any) => {
  const [editing, setEditing] = useState<boolean>(false);

  // const handleHighlight = () => {
  //   const selectedText = window.getSelection()?.toString().trim();
  //   if (selectedText) {
  //     console.log(`Highlighted Text: ${selectedText}`);
  //   }
  // };

  const handleClick = (data: any) => {
    if (data === "bold") {
      setQuestion({
        ...question,
        options: {
          ...question.options,
          bold: !question.options.bold,
        },
      });
    }
    if (data === "italic") {
      setQuestion({
        ...question,
        options: {
          ...question.options,
          italic: !question.options.italic,
        },
      });
    }
    if (data === "underline") {
      setQuestion({
        ...question,
        options: {
          ...question.options,
          underline: !question.options.underline,
        },
      });
    }
  };

  return (
    <Box
      w="full"
      onMouseEnter={() => setEditing(true)}
      onMouseLeave={() => setEditing(false)}
    >
      <Editable
        defaultValue={question.name}
        onChange={(e) => {
          setQuestion({ ...question, name: e });
        }}
      >
        <EditablePreview
          w="full"
          fontSize="xl"
          {...(question.options.italic === true ? { fontStyle: "italic" } : {})}
          {...(question.options.bold === true ? { fontWeight: "bold" } : {})}
          {...(question.options.underline === true
            ? { textDecoration: "underline" }
            : {})}
        />
        <Input
          // onMouseUp={handleHighlight}
          fontSize="xl"
          variant="flushed"
          as={EditableInput}
        />
      </Editable>
      <Collapse in={editing} animateOpacity>
        <Controls
          handleClick={handleClick}
          isControls={editing}
          options={question.options}
        />
      </Collapse>
    </Box>
  );
};
