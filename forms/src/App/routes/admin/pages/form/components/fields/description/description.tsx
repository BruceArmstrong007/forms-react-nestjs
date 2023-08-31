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

export const Description = ({ description, setDescription }: any) => {
  const [editing, setEditing] = useState<boolean>(false);

  // const handleHighlight = () => {
  //   const selectedText = window.getSelection()?.toString().trim();
  //   if (selectedText) {
  //     console.log(`Highlighted Text: ${selectedText}`);
  //   }
  // };

  const handleClick = (data: any) => {
    if (data === "bold") {
      setDescription({
        ...description,
        options: { ...description.options, bold: !description.options.bold },
      });
    }
    if (data === "italic") {
      setDescription({
        ...description,
        options: {
          ...description.options,
          italic: !description.options.italic,
        },
      });
    }
    if (data === "underline") {
      setDescription({
        ...description,
        options: {
          ...description.options,
          underline: !description.options.underline,
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
        defaultValue={description.name}
        onChange={(e) => {
          setDescription({ ...description, name: e });
        }}
      >
        <EditablePreview
          w={"full"}
          fontSize={"sm"}
          {...(description.options.italic === true
            ? { fontStyle: "italic" }
            : {})}
          {...(description.options.bold === true ? { fontWeight: "bold" } : {})}
          {...(description.options.underline === true
            ? { textDecoration: "underline" }
            : {})}
        />
        <Input
          // onMouseUp={handleHighlight}
          fontSize={"sm"}
          variant="flushed"
          as={EditableInput}
        />
      </Editable>
      <Collapse in={editing} animateOpacity>
        <Controls
          handleClick={handleClick}
          isControls={editing}
          options={description.options}
        />
      </Collapse>
    </Box>
  );
};
