import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Navbar } from "./components/Navbar";
export const Admin = () => {
  return (
    <Box w="full" h="100vh">
      <Navbar />
      <Outlet />
    </Box>
  );
};
