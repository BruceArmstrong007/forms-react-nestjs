import { VStack, Text } from "@chakra-ui/layout";
import { useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  Collapse,
  FocusLock,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  FormControl,
  Icon,
  IconButton,
  Input,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { RiStackFill } from "react-icons/ri";
import { FaArrowDown, FaArrowUp, FaSave } from "react-icons/fa";
import { FormLabel } from "@chakra-ui/form-control";

export const Options = ({ addSection, form, setForm, saveForm }: any) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [toggle, setToggle] = useState<boolean>(false);
  const firstFieldRef = useRef(null);
  return (
    <VStack spacing="4" position="fixed" bottom="30px" right="30px">
      <Collapse in={toggle} animateOpacity>
        <VStack spacing="4">
          <Tooltip label="Add Section" placement="left" closeOnClick={false}>
            <IconButton
              onClick={() => addSection()}
              size="lg"
              variant="solid"
              isRound={true}
              colorScheme="green"
              aria-label="Add Section"
            >
              <Icon as={RiStackFill}></Icon>
            </IconButton>
          </Tooltip>
          <Popover
            isOpen={isOpen}
            initialFocusRef={firstFieldRef}
            placement="right"
            closeOnBlur={false}
          >
            <PopoverTrigger>
              <IconButton
                onMouseEnter={onOpen}
                onMouseLeave={onClose}
                size="lg"
                variant="solid"
                isRound={true}
                colorScheme="green"
                aria-label="Save Form"
              >
                <Icon as={FaSave}></Icon>
              </IconButton>
            </PopoverTrigger>
            <PopoverContent p={5} onMouseEnter={onOpen} onMouseLeave={onClose}>
              <FocusLock persistentFocus={false}>
                <PopoverArrow />
                <PopoverCloseButton />
                <VStack spacing={4}>
                  <Text fontSize="lg" justifySelf="center">
                    Save Form
                  </Text>
                  <FormControl>
                    <FormLabel>Form Name</FormLabel>
                    <Input
                      size="sm"
                      ref={firstFieldRef}
                      defaultValue={form?.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </FormControl>
                  <ButtonGroup
                    w="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Button size="sm" variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        saveForm();
                        onClose();
                      }}
                      colorScheme="teal"
                    >
                      Save
                    </Button>
                  </ButtonGroup>
                </VStack>
              </FocusLock>
            </PopoverContent>
          </Popover>
        </VStack>
      </Collapse>
      <Tooltip label="Collapse Options" placement="left" closeOnClick={false}>
        <IconButton
          onClick={() => setToggle(!toggle)}
          size="lg"
          variant="solid"
          isRound={true}
          colorScheme="blue"
          aria-label="Check "
        >
          <Icon as={toggle ? FaArrowDown : FaArrowUp}></Icon>
        </IconButton>
      </Tooltip>
    </VStack>
  );
};
