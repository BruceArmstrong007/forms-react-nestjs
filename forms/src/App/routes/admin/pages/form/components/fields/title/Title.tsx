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

export const Title = ({ title, setTitle }: any) => {
  const [editing, setEditing] = useState<boolean>(false);

  // const handleHighlight = () => {
  //   const selectedText = window.getSelection()?.toString().trim();
  //   if (selectedText) {
  //     console.log(`Highlighted Text: ${selectedText}`);
  //   }
  // };

  const handleClick = (data: any) => {
    if (data === "bold") {
      setTitle({
        ...title,
        options: {
          ...title.options,
          bold: !title.options.bold,
        },
      });
    }
    if (data === "italic") {
      setTitle({
        ...title,
        options: {
          ...title.options,
          italic: !title.options.italic,
        },
      });
    }
    if (data === "underline") {
      setTitle({
        ...title,
        options: {
          ...title.options,
          underline: !title.options.underline,
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
        defaultValue={title.name}
        onChange={(e) => {
          setTitle({ ...title, name: e });
        }}
      >
        <EditablePreview
          w={"full"}
          fontSize={"2xl"}
          {...(title.options.italic === true ? { fontStyle: "italic" } : {})}
          {...(title.options.bold === true ? { fontWeight: "bold" } : {})}
          {...(title.options.underline === true
            ? { textDecoration: "underline" }
            : {})}
        />
        <Input
          // onMouseUp={handleHighlight}
          fontSize={"2xl"}
          variant="flushed"
          as={EditableInput}
        />
      </Editable>
      <Collapse in={editing} animateOpacity>
        <Controls
          handleClick={handleClick}
          isControls={editing}
          options={title.options}
        />
      </Collapse>
    </Box>
  );
};
