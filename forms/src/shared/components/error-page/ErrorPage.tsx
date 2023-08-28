import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { NavLink, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  let error: any = useRouteError();
  if  (!error) {
    error = {
      statusText : '404 Not Found'
    }
  }
  return (
    <Box h="100vh" w="100%" display="flex" id="error-page" alignItems="center" justifyContent="center"> 
      <VStack spacing={6}>
      <Heading as="h2" size="xl" noOfLines={1}>
        Opps!
      </Heading>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <Button as={NavLink} to="/">
          Go to Homepage
        </Button>
      </VStack>
    </Box>
  );
};
