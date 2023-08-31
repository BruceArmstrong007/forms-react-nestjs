import Icon from "@chakra-ui/icon";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { Box, HStack, Text } from "@chakra-ui/layout";
import { useRef, useState } from "react";
import { FaLink } from "react-icons/fa";
import { useToast } from "@chakra-ui/toast";
import { MdDelete } from "react-icons/md";
import { FiFile } from "react-icons/fi";
import { formState } from "../../../../../../../state/form-state";
import { UploadOptions } from "../../../../../../../../shared/utils/enums";

export const Controls = ({ urlChange, isControls, url }: any) => {
  const [file, setFile] = useState<any>({ name: "" });
  const forms: any = formState((state: any) => state);
  const toast = useToast();
  const inputRef: any = useRef();
  const fileRef: any = useRef();
  const addFile = (file: any) => {
    setFile(file);
    const result = new FormData();
    result.append("file", file);
    forms.uploadFile(result, UploadOptions.Video).then((res: any) => {
      if (res?.statusCode) {
        toast({
          title: "API Error",
          description: res?.message,
          status: "error",
        });
        return;
      }
      urlChange(res.link);
      toast({
        title: "Success!",
        description: "Video successfully uploaded.",
        status: "success",
      });
    });
  };
  const removeFile = async () => {
    const response = await forms.deleteFile(file?.name);
    if (response?.statusCode) {
      toast({
        title: "API Error",
        description: response?.message,
        status: "error",
      });
      return;
    }
    toast({
      title: "Success!",
      description: "Video successfully deleted.",
      status: "success",
    });
    urlChange("");

    setFile({ name: "" });
    fileRef.current.value = "";
  };

  return isControls ? (
    <Box w="full">
      <HStack>
        <InputGroup>
          <InputLeftElement>
            <Icon as={FaLink} />
          </InputLeftElement>
          <Input
            variant="flushed"
            defaultValue={url}
            type="url"
            name="url"
            placeholder="Enter a Video URL"
            onChange={(e) => urlChange(e.target.value)}
          />
        </InputGroup>
        <Text fontSize={"xs"}>OR</Text>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={FiFile} />}
          />
          <input
            type="file"
            onChange={(e: any) => addFile(e.target.files[0])}
            accept="video/mp4"
            ref={fileRef}
            style={{ display: "none" }}
          ></input>
          <Input
            cursor="pointer"
            placeholder="Upload Your Video"
            variant="flushed"
            readOnly={true}
            ref={inputRef}
            value={file?.name}
            onClick={() => {
              fileRef.current.click();
            }}
          />

          {file?.name && url && (
            <InputRightElement
              onClick={() => removeFile()}
              children={<Icon as={MdDelete} />}
            />
          )}
        </InputGroup>
      </HStack>
      <Text fontSize="xs" textAlign="end">
        Upload a video within 50MB (Supported Format: MP4)
      </Text>
    </Box>
  ) : null;
};
