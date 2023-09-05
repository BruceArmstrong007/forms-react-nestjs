import {
  Box,
  VStack,
  Input,
  FormControl,
  FormErrorMessage,
  InputRightElement,
  Icon,
  useToast,
  InputGroup,
  InputLeftElement,
  FormHelperText,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FiFile } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { submitState } from "../../../../../../../state/submit-state";

const FileTypes: any = {
  csv: ".csv",
  txt: ".txt",
  pdf: "application/pdf",
  image: "image/*",
  video: "video/*",
};
export const File = ({ entries, handleAnswer, required }: any) => {
  const [input, setInput] = useState<any>("");
  const [names, setNames] = useState<string[]>([]);
  const form: any = submitState((state: any) => state);
  const isError = required && input === "";
  const toast = useToast();
  const inputRef: any = useRef();
  const fileRef: any = useRef();
  useEffect(() => {
    handleAnswer(input);
  }, [input]);

  const uploadFiles = async (files: any) => {
    if (files.length > 5) {
      toast({
        title: "Upload Error",
        description: "Only 5 files can be uploaded at once.",
        status: "error",
      });
      return;
    }
    for (let i = 0; i < files.length; i++) {
      const result = new FormData();
      result.append("file", files[i]);
      const res = await form.uploadFile(result);
      if (!res) {
        toast({
          title: "Failed to connect",
          description: "Couldn't connect to server.",
          status: "error",
        });
        return;
      }
      const statusCode = res?.statusCode;
      if (statusCode) {
        toast({
          title: "API Error",
          description: res?.message,
          status: "error",
        });
        return;
      }
      setInput((prev: any) => [
        ...prev,
        { link: res.link, name: files[i].name },
      ]);
      setNames((prev) => [...prev, files[i].name]);
      toast({
        title: "Success!",
        description: "Files successfully uploaded.",
        status: "success",
      });
    }
  };

  const removeFiles = async () => {
    if (input.length > 0) {
      const responses = await Promise.all(
        names.map((names: string) => form.deleteFile(names))
      );
      toast({
        title: "Success!",
        description: "Files successfully deleted.",
        status: "success",
      });
      fileRef.current.value = "";
      setNames([]);
      setInput([]);
    }
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
          <FormControl isRequired={required} isInvalid={isError}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FiFile} />}
              />
              <input
                type="file"
                onChange={(e: any) => uploadFiles(e.target.files)}
                multiple={true}
                accept={entries
                  .map((entry: any) => FileTypes[entry] + ", ")
                  .join(" ")}
                ref={fileRef}
                style={{ display: "none" }}
              ></input>
              <Input
                cursor="pointer"
                placeholder="Upload your files"
                readOnly={true}
                value={names.join(",")}
                ref={inputRef}
                onClick={() => {
                  fileRef.current.click();
                }}
              />

              {names?.length > 0 && (
                <InputRightElement
                  onClick={() => removeFiles()}
                  children={<Icon as={MdClose} />}
                />
              )}
            </InputGroup>
            <FormHelperText>
              Upload files under 5MB (Max Limit 5 Files)
            </FormHelperText>
            {isError && <FormErrorMessage>Required.</FormErrorMessage>}
          </FormControl>
        </VStack>
      </Box>
    </Box>
  );
};
