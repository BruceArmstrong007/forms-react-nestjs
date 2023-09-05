import { VStack } from "@chakra-ui/layout";
import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { FaSave } from "react-icons/fa";

export const Options = ({ saveForm }: any) => {
  return (
    <VStack spacing="4" position="fixed" bottom="30px" right="30px">
      <Tooltip label="Save Form" placement="left" closeOnClick={false}>
        <IconButton
          onClick={() => saveForm()}
          size="lg"
          variant="solid"
          isRound={true}
          colorScheme="blue"
          color="white"
          aria-label="Save Form"
        >
          <Icon as={FaSave}></Icon>
        </IconButton>
      </Tooltip>
    </VStack>
  );
};
