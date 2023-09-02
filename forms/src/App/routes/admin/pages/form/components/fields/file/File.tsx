import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Switch,
  Collapse,
  CheckboxGroup,
  HStack,
  Checkbox,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface FileType {
  type: boolean;
  options: string[];
}

export const File = ({ entries, handleAnswer }: any) => {
  const [fileType, setFileType] = useState<FileType>(entries[0]);

  const fileTypeRequired = (required: boolean) => {
    setFileType((prev: any) => {
      return { ...prev, type: required };
    });
  };

  useEffect(() => {
    handleAnswer([fileType]);
  }, [fileType]);

  const switchType = (type: boolean, field: string) => {
    setFileType((prev: any) => {
      let options: string[] = prev.options ? prev.options : [];
      if (type) {
        if (!options?.includes(field)) options.push(field);
      } else {
        options = options?.filter((option) => option !== field);
      }
      return { ...prev, options };
    });
  };

  return (
    <Box w="full">
      <Box display="flex" justifyContent="space-between" w="full">
        <VStack
          display="flex"
          justifyContent="start"
          alignItems="start"
          spacing={2}
        >
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="filetype" mb="0">
              Allow only specific file types ?
            </FormLabel>
            <Switch
              id="filetype"
              onChange={(e) => fileTypeRequired(e.target.checked)}
              defaultChecked={fileType?.type}
            />
          </FormControl>

          <Collapse in={fileType?.type} animateOpacity>
            <CheckboxGroup colorScheme="green">
              <HStack w="full" spacing={2}>
                <Checkbox
                  size="sm"
                  {...(fileType?.options?.includes("txt")
                    ? { defaultChecked: true }
                    : {})}
                  colorScheme="green"
                  onChange={(e) => switchType(e.target.checked, "txt")}
                >
                  TXT (Text)
                </Checkbox>
                <Checkbox
                  size="sm"
                  {...(fileType?.options?.includes("csv")
                    ? { defaultChecked: true }
                    : {})}
                  colorScheme="green"
                  onChange={(e) => switchType(e.target.checked, "csv")}
                >
                  CSV
                </Checkbox>
                <Checkbox
                  size="sm"
                  {...(fileType?.options?.includes("pdf")
                    ? { defaultChecked: true }
                    : {})}
                  colorScheme="green"
                  onChange={(e) => switchType(e.target.checked, "pdf")}
                >
                  PDF
                </Checkbox>
                <Checkbox
                  size="sm"
                  {...(fileType?.options?.includes("image")
                    ? { defaultChecked: true }
                    : {})}
                  colorScheme="green"
                  onChange={(e) => switchType(e.target.checked, "image")}
                >
                  Image Formats
                </Checkbox>
                <Checkbox
                  size="sm"
                  {...(fileType?.options?.includes("video")
                    ? { defaultChecked: true }
                    : {})}
                  colorScheme="green"
                  onChange={(e) => switchType(e.target.checked, "video")}
                >
                  Video Formats
                </Checkbox>
              </HStack>
            </CheckboxGroup>
          </Collapse>
        </VStack>
        <VStack
          display="flex"
          justifyContent="start"
          alignItems="start"
          spacing={2}
        >
          <Text fontSize="sm">Note :</Text>
          <UnorderedList fontSize="xs" spacing={3}>
            <ListItem>Only 5 files are uploaded at once.</ListItem>
            <ListItem>Upload files under 5 MB.</ListItem>
          </UnorderedList>
        </VStack>
      </Box>
    </Box>
  );
};
