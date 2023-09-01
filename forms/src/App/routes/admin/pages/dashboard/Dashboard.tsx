import { formState } from "../../../../state/form-state";
import { Heading, SimpleGrid } from "@chakra-ui/layout";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useToast,
  IconButton,
  Stack,
  Input,
  ButtonGroup,
  Button,
  FormLabel,
  FormHelperText,
  FocusLock,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Icon from "@chakra-ui/icon";
import { MdAdd, MdDelete, MdShare } from "react-icons/md";
import { Tooltip, FormControl } from "@chakra-ui/react";
import { CLIENT_URL } from "../../../../environment";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  useDisclosure,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

const initialSectionState = {
  name: "Enter Section",
  type: "section",
  options: {
    bold: false,
    italic: false,
    underline: false,
  },
};

const initialDescriptionState = {
  name: "Enter Description",
  type: "description",
  options: {
    bold: false,
    italic: false,
    underline: false,
  },
};

const initialFormData = {
  sections: [
    {
      section: initialSectionState,
      description: initialDescriptionState,
      index: 0,
      fields: [],
    },
  ],
  name: "New Form",
  _id: "",
};

export const Dashboard = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = useRef(null);
  const form: any = formState((state: any) => state);
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState<string>("");

  const openForm = (formID: string) => {
    navigate("/admin/forms/" + formID);
  };

  const addForm = async () => {
    const response = await form.saveForm(initialFormData);
    if (response.statusCode) {
      toast({
        title: "API Error",
        description: response?.message,
        status: "error",
      });
      return;
    }
    toast({
      title: "Success!",
      description: "Form successfully Added.",
      status: "success",
    });
    await form.getForms();
    navigate("/admin/forms/" + response?.formID);
  };

  const deleteForm = async (formID: string) => {
    const response = await form.deleteForm(formID);
    if (response.statusCode) {
      toast({
        title: "API Error",
        description: response?.message,
        status: "error",
      });
      return;
    }
    toast({
      title: "Success!",
      description: "Form successfully Deleted.",
      status: "success",
    });
    await form.getForms();
  };

  const shareForm = async (formID: string) => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      "Hey Checkout this new Form!"
    )}&body=${encodeURIComponent(
      "I have built a amazing form, check it out! " +
        CLIENT_URL +
        "/user/form/" +
        formID
    )}`;

    // Open the user's default email client with the pre-filled content
    window.location.href = mailtoLink;
  };

  const renderForm = form.forms.map((data: any) => {
    return (
      <Box
        key={data?._id}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Card w="200px" h="200px">
          <CardHeader onClick={() => openForm(data?._id)}>
            <Heading size="sm">{data.name}</Heading>
          </CardHeader>
          <CardBody onClick={() => openForm(data?._id)}></CardBody>
          <CardFooter>
            <Box w="full" display="flex" justifyContent="end" alignItems="end">
              <ButtonGroup>
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
                        {/* <FormControl>
                          <FormLabel>Subject</FormLabel>
                          <Input
                            size="xs"
                            defaultValue={email}
                            ref={firstFieldRef}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </FormControl> */}
                        <ButtonGroup
                          w="full"
                          display="flex"
                          justifyContent="space-between"
                        >
                          <Button variant="outline" size="xs" onClick={onClose}>
                            Cancel
                          </Button>
                          <Button
                            size="xs"
                            onClick={() => shareForm(data?._id)}
                            colorScheme="teal"
                          >
                            Share
                          </Button>
                        </ButtonGroup>
                      </Stack>
                    </FocusLock>
                  </PopoverContent>
                </Popover>
                <Tooltip label="Delete Form" placement="bottom">
                  <IconButton
                    size="xs"
                    onClick={() => deleteForm(data?._id)}
                    aria-label="Delete Form"
                    variant="outline"
                    colorScheme="white"
                    _hover={{ backgroundColor: "red", border: "transparent" }}
                    isRound={true}
                  >
                    <Icon as={MdDelete}></Icon>
                  </IconButton>
                </Tooltip>
              </ButtonGroup>
            </Box>
          </CardFooter>
        </Card>
      </Box>
    );
  });

  return (
    <Box w="full" padding="20px">
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 6 }} spacing={4}>
        {renderForm}
        <Tooltip label="Add Form" placement="bottom">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Card w="200px" h="200px" onClick={() => addForm()}>
              <CardBody
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Icon as={MdAdd} fontSize={"9xl"} />
              </CardBody>
            </Card>
          </Box>
        </Tooltip>
      </SimpleGrid>
    </Box>
  );
};
