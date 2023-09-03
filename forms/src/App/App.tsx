import { ChakraProvider, theme } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { authState } from "./state/auth-state";
import { useEffect } from "react";

export const App = () => {
  const auth = authState((state: any) => state);
  useEffect(() => {
    let refreshToken = setInterval(() => {
      if (auth.token.refreshToken) {
        auth.refresh();
      }
    }, 4000);
    return () => {
      clearInterval(refreshToken);
    };
  }, []);
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
