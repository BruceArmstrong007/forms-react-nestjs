import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Box } from "@chakra-ui/layout";
import { FaCheck } from "react-icons/fa";

export const Submitted = () => {
  return (
    <Box
      w="full"
      bg="teal.500"
      rounded="md"
      h="300px"
      padding="20px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Button size="xl" variant="none" leftIcon={<Icon as={FaCheck}></Icon>}>
        Form already submitted
      </Button>
    </Box>
  );
};
