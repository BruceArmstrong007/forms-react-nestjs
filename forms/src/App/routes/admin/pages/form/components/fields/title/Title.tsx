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
    setTitle((prev: any) => {
      return {
        ...prev,
        options: {
          ...prev.options,
          [data]: !prev.options[data],
        },
      };
    });
  };

  const update = (e: string) => {
    setTitle((prev: any) => {
      return { ...prev, name: e };
    });
  };

  return (
    <Box
      w="full"
      onMouseEnter={() => setEditing(true)}
      onMouseLeave={() => setEditing(false)}
    >
      <Editable defaultValue={title.name} onChange={update}>
        <EditablePreview
          w="full"
          fontSize="xl"
          {...(title.options.italic === true ? { fontStyle: "italic" } : {})}
          {...(title.options.bold === true ? { fontWeight: "bold" } : {})}
          {...(title.options.underline === true
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
          options={title.options}
        />
      </Collapse>
    </Box>
  );
};
