import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/alert";
import { Box } from "@chakra-ui/layout";

export const AuthAlert = (alert: any) => {
  console.log(alert);

  return (
    <Box w="full" padding="20px" position="absolute" bottom="0">
      <Alert w="full" status={alert?.props?.type}>
        <AlertIcon />
        <Box>
          <AlertTitle>{alert?.props?.title}</AlertTitle>
          <AlertDescription>{alert?.props?.message}</AlertDescription>
        </Box>
      </Alert>
    </Box>
  );
};
