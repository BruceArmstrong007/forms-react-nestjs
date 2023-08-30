import { ChakraProvider, theme } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <ChakraProvider
      theme={theme}
      toastOptions={{
        defaultOptions: {
          position: "top-right",
          duration: 5000,
          isClosable: true,
        },
      }}
    >
      <Outlet />
    </ChakraProvider>
  );
};
