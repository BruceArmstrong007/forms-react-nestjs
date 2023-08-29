import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const App = () => {
  return (
  <ChakraProvider theme={theme}>
    <Outlet/>
  </ChakraProvider>
);}
