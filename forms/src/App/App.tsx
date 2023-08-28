import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import { ThemeSwitcher } from "../shared/components/theme-switcher/ThemeSwitcher";
import { Logo } from "../shared/components/logo/Logo";
import { Outlet, Route, Routes } from "react-router-dom";
import { Admin } from "./routes/admin/Admin";
import { Auth } from "./routes/auth/Auth";
import { User } from "./routes/user/User";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Outlet/>
  </ChakraProvider>
);
