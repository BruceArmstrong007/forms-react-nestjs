import { ButtonGroup, IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";

export const Controls = ({ handleClick, isControls, options }: any) => {

  return isControls ? (
    <ButtonGroup justifyContent="start" size="xs" w="full" spacing={2} mt={2}>
      <IconButton
        aria-label="Bold"
        onClick={() => handleClick("bold")}
        icon={<Icon as={FaBold} />}
        {...(options.bold === true ? {backgroundColor: 'teal.400'} : {backgroundColor: 'teal.500'}
)}
      />
      <IconButton
        aria-label="Italic"
        onClick={() => handleClick("italic")}
        icon={<Icon as={FaItalic} />}
        {...(options.italic === true ? {backgroundColor: 'teal.400'} : {backgroundColor: 'teal.500'}
)}
      />
      <IconButton
        aria-label="Underline"
        onClick={() => handleClick("underline")}
        icon={<Icon as={FaUnderline} />}
        {...(options.underline === true ? {backgroundColor: 'teal.400'} : {backgroundColor: 'teal.500'}
)}
      />
    </ButtonGroup>
  ) : null;
};
