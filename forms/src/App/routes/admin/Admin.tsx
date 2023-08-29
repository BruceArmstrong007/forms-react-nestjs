import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Navbar } from "./components/Navbar";
import { alertState } from "../../state/alert-state";
import { AlertPopup } from "../../../shared/components/alert/AlertPopup";
import { adminState } from "../../state/admin-state";
import { useEffect } from "react";
export const Admin = () => {
  const alert = alertState((state: any) => state.alert);
  const admin: any = adminState((state: any) => state);
  useEffect(()=>{
    admin.profile();
  },[])
  return (
    <Box w="full" h="100vh">
      <Navbar />
      <Outlet />

      {alert.type && <AlertPopup props={alert} />}
    </Box>
  );
};
