import { ButtonGroup, IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Tooltip } from "@chakra-ui/react";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";

export const Controls = ({ handleClick, isControls, options }: any) => {
  return isControls ? (
    <ButtonGroup justifyContent="start" w="full" spacing={2} mt={2}>
      <Tooltip label="Bold" placement="bottom" closeOnClick={false}>
        <IconButton
          aria-label="Bold"
          onClick={() => handleClick("bold")}
          icon={<Icon as={FaBold} />}
          {...(options.bold === true
            ? { backgroundColor: "green", border: "teal" }
            : null)}
          variant="outline"
          isRound={true}
          size="xs"
          border="teal"
          colorScheme="white"
          _hover={{ backgroundColor: "green", border: "teal" }}
        />
      </Tooltip>
      <Tooltip label="Italic" placement="bottom" closeOnClick={false}>
        <IconButton
          aria-label="Italic"
          onClick={() => handleClick("italic")}
          icon={<Icon as={FaItalic} />}
          {...(options.italic === true
            ? { backgroundColor: "green", border: "teal" }
            : null)}
          variant="outline"
          isRound={true}
          size="xs"
          border="teal"
          colorScheme="white"
          _hover={{ backgroundColor: "green", border: "teal" }}
        />
      </Tooltip>
      <Tooltip label="Underline" placement="bottom" closeOnClick={false}>
        <IconButton
          aria-label="Underline"
          onClick={() => handleClick("underline")}
          icon={<Icon as={FaUnderline} />}
          {...(options.underline === true
            ? { backgroundColor: "green", border: "teal" }
            : null)}
          variant="outline"
          isRound={true}
          size="xs"
          border="teal"
          colorScheme="white"
          _hover={{ backgroundColor: "green", border: "teal" }}
        />
      </Tooltip>
    </ButtonGroup>
  ) : null;
};
