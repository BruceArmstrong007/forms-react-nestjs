import { Box, Grid, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
export const Auth = () => {
  return (
    <Box w="full" h="100vh">
      <Navbar />
      <VStack
        w="full"
        h="70%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          w="400px"
          p="20px"
          color="white"
          bg="teal.500"
          rounded="md"
          shadow="md"
        >
          <Outlet />
        </Grid>
      </VStack>
    </Box>
  );
};
