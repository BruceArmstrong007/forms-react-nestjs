import { Outlet } from "react-router-dom";
import { Box, Grid, HStack, VStack } from "@chakra-ui/react";
import { Navbar } from "./components/Navbar";
import { alertState } from "../../state/alert-state";
import { AuthAlert } from "../../../shared/components/alert/AuthAlert";
export const Admin = () => {
  const alert = alertState((state: any) => state.alert);
  return (
    <Box w="full" h="100vh">
      <Navbar />
      <Outlet />

      {alert.type && <AuthAlert props={alert} />}
    </Box>
  );
};
