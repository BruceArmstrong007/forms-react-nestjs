import { useParams } from "react-router";
import { formState } from "../../../../state/form-state";
import { Box, VStack, Heading } from "@chakra-ui/layout";
import { Card, CardFooter, CardHeader } from "@chakra-ui/card";
import { CardBody, Icon, Tooltip, useToast } from "@chakra-ui/react";
import { ButtonGroup, IconButton } from "@chakra-ui/button";
import { MdDelete } from "react-icons/md";
import { Sections } from "./components/sections/Sections";

export const Response = () => {
  const params = useParams();
  const forms = formState((state: any) => state);
  const toast = useToast();

  const deleteResponse = async (responseID: string) => {
    const res = await forms.deleteResponse(responseID);
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
    toast({
      title: "Success!",
      description: "response successfully deleted.",
      status: "success",
    });
    await forms.getResponses();
  };

  const renderResponses = forms.responses
    ?.filter((response: any) => response.formID === params.id)
    .map((value: any, index: any) => {
      return (
        <Card
          key={index}
          w="full"
          padding="10px"
          color="white"
          bg="teal.500"
          rounded="md"
        >
          <CardHeader>
            <Heading as="h3" size="lg" textAlign="center">
              Response {index + 1}
            </Heading>
          </CardHeader>
          <CardBody>
            <Sections sections={value?.sections} />
          </CardBody>
          <CardFooter>
            <ButtonGroup
              w="full"
              display="flex"
              justifyContent="end"
              alignItems="center"
            >
              <Tooltip label="View Responses" placement="bottom">
                <IconButton
                  size="xs"
                  onClick={() => deleteResponse(value?._id)}
                  aria-label="Delete Response"
                  variant="outline"
                  colorScheme="white"
                  _hover={{ backgroundColor: "red", border: "transparent" }}
                  isRound={true}
                >
                  <Icon as={MdDelete}></Icon>
                </IconButton>
              </Tooltip>
            </ButtonGroup>
          </CardFooter>
        </Card>
      );
    });

  return (
    <Box w="full" display="flex" alignItems="center" justifyContent="center">
      <VStack w="70%" spacing={4}>
        {renderResponses}
      </VStack>
    </Box>
  );
};
