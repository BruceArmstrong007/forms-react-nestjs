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
  ButtonGroup,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Icon from "@chakra-ui/icon";
import { MdAdd, MdDelete } from "react-icons/md";
import { Tooltip } from "@chakra-ui/react";

import { FaWpforms } from "react-icons/fa";
import { ShareButton } from "./components/share-button/ShareButton";

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
  const form: any = formState((state: any) => state);
  const navigate = useNavigate();
  const toast = useToast();

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



  const viewResponses = async (formID: string) => {
    navigate("/admin/responses/" + formID);
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
            <Tooltip label="View Responses" placement="bottom">
              <IconButton
                size="xs"
                onClick={() => viewResponses(data?._id)}
                aria-label="View Responses"
                variant="outline"
                colorScheme="white"
                _hover={{ backgroundColor: "blue", border: "transparent" }}
                isRound={true}
              >
                <Icon as={FaWpforms}></Icon>
              </IconButton>
            </Tooltip>
            <Box w="full" display="flex" justifyContent="end" alignItems="end">
              <ButtonGroup>
              <ShareButton id={data?._id} />
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
    <VStack
      w="full"
      padding="20px"
      spacing={4}
      display="flex"
      justifyContent="start"
      alignItems="start"
    >
      <Heading>Dashboard</Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 6 }} spacing={4}>
        {renderForm}
        <Tooltip label="Add Form" placement="bottom">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Card w="200px" h="200px" onClick={() => addForm()}>
              <CardBody
                display="flex"
                justifyContent="center"
                alignItems="center"
                _hover={{ backgroundColor: "rgba(0,0,0,.5)  "}}
              >
                <Icon as={MdAdd} fontSize={"9xl"} />
              </CardBody>
            </Card>
          </Box>
        </Tooltip>
      </SimpleGrid>
    </VStack>
  );
};
