import {
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Stack,
  Input,
  Button,
  FormLabel,
  FormHelperText,
  useDisclosure,
  FocusLock,
  Icon,
  IconButton,
  FormControl,
  Popover,
  ButtonGroup,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CLIENT_URL } from "../../../../../../environment";
import { MdShare } from "react-icons/md";

export const ShareButton = ({ id }: any) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = useRef(null);
  const [email, setEmail] = useState<string>("");

  const shareForm = () => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      "Hey Checkout this new Form!"
    )}&body=${encodeURIComponent(
      "I have built a amazing form, check it out! " +
        CLIENT_URL +
        "/user/form/" +
        id
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <IconButton
          size="xs"
          aria-label="Share Form"
          variant="outline"
          colorScheme="white"
          _hover={{
            backgroundColor: "blue",
            border: "transparent",
          }}
          isRound={true}
        >
          <Icon as={MdShare}></Icon>
        </IconButton>
      </PopoverTrigger>
      <PopoverContent p={5}>
        <FocusLock persistentFocus={false}>
          <PopoverArrow />
          <PopoverCloseButton />

          <Stack spacing={4}>
            <FormControl>
              <FormLabel>E-mail Recipients</FormLabel>
              <Input
                size="xs"
                defaultValue={email}
                ref={firstFieldRef}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormHelperText fontSize="xs">
                Enter Email ids followed by ',' to distingush them
              </FormHelperText>
            </FormControl>
            <ButtonGroup w="full" display="flex" justifyContent="space-between">
              <Button variant="outline" size="xs" onClick={onClose}>
                Cancel
              </Button>
              <Button
                size="xs"
                onClick={() => shareForm()}
                colorScheme="teal"
              >
                Share
              </Button>
            </ButtonGroup>
          </Stack>
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
};
