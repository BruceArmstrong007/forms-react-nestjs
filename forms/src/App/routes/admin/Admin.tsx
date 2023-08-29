import { Outlet } from "react-router-dom";
import { Box, Grid, HStack, VStack } from "@chakra-ui/react";
import { Navbar } from "./components/Navbar";
import { alertState } from "../../state/alert-state";
import { AlertPopup } from "../../../shared/components/alert/AlertPopup";
export const Admin = () => {
  const alert = alertState((state: any) => state.alert);
  return (
    <Box w="full" h="100vh">
      <Navbar />
      <Outlet />

      {alert.type && <AlertPopup props={alert} />}
    </Box>
  );
};
