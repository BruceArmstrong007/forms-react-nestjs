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

export const Section = ({ section, setSection }: any) => {
  const [editing, setEditing] = useState<boolean>(false);

  // const handleHighlight = () => {
  //   const selectedText = window.getSelection()?.toString().trim();
  //   if (selectedText) {
  //     console.log(`Highlighted Text: ${selectedText}`);
  //   }
  // };

  const handleClick = (data: any) => {
    if (data === "bold") {
      setSection({
        ...section,
        options: {
          ...section.options,
          bold: !section.options.bold,
        },
      });
    }
    if (data === "italic") {
      setSection({
        ...section,
        options: {
          ...section.options,
          italic: !section.options.italic,
        },
      });
    }
    if (data === "underline") {
      setSection({
        ...section,
        options: {
          ...section.options,
          underline: !section.options.underline,
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
        defaultValue={section.name}
        onChange={(e) => {
          setSection({ ...section, name: e });
        }}
      >
        <EditablePreview
          w="full"
          fontSize="2xl"
          {...(section.options.italic === true ? { fontStyle: "italic" } : {})}
          {...(section.options.bold === true ? { fontWeight: "bold" } : {})}
          {...(section.options.underline === true
            ? { textDecoration: "underline" }
            : {})}
        />
        <Input
          // onMouseUp={handleHighlight}
          fontSize="2xl"
          variant="flushed"
          as={EditableInput}
        />
      </Editable>
      <Collapse in={editing} animateOpacity>
        <Controls
          handleClick={handleClick}
          isControls={editing}
          options={section.options}
        />
      </Collapse>
    </Box>
  );
};
