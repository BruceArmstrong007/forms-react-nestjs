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
    setDescription((prev: any) => {
      return {
        ...prev,
        options: { ...prev.options, [data]: !prev.options[data] },
      };
    });
  };

  const update = (e: string) => {
    setDescription((prev: any) => {
      return { ...prev, name: e };
    });
  };

  return (
    <Box
      w="full"
      onMouseEnter={() => setEditing(true)}
      onMouseLeave={() => setEditing(false)}
    >
      <Editable defaultValue={description.name} onChange={update}>
        <EditablePreview
          w="full"
          fontSize="md"
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
          fontSize="md"
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
