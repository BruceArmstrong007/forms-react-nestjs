import {
  Box,
  Flex,
  Button,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  Text,
  Wrap,
  WrapItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { Logo } from "../../../../shared/components/logo/Logo";
import { ThemeSwitcher } from "../../../../shared/components/theme-switcher/ThemeSwitcher";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdExitToApp } from "react-icons/md";
import { adminState } from "../../../state/admin-state";
import { authState } from "../../../state/auth-state";

export const Navbar = () => {
  const navigate = useNavigate();
  const admin = adminState((state: any) => state);
  
  const auth: any = authState((state: any) => state);

  const handleLogout = () => {
    auth.logout().then(() => navigate("/landing-page"));
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "start", md: "start" }}>
          <HStack spacing={4}>
            <Link to={"/"}>
              <Logo h="30px" />
            </Link>
            <Button
              as={NavLink}
              to="/admin/dashboard"
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
            >
              Dashboard
            </Button>
            <Button
              as={NavLink}
              to="/admin/forms"
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
            >
              Forms
            </Button>
          </HStack>
          <Flex display={{ base: "none", md: "flex" }} ml={10}></Flex>
        </Flex>
        <Stack flex={{ base: 1, md: 1 }} justify={"flex-end"} direction={"row"}>
          <ThemeSwitcher />
          <Menu isLazy>
            {({ onClose }) => {
              return (
                <>
                  <MenuButton as={Button} colorScheme="teal" variant="ghost">
                    <Wrap>
                      <WrapItem>
                        <Avatar size="sm" src={admin.profile} />
                      </WrapItem>
                    </Wrap>
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      closeOnSelect={false}
                      display="flex"
                      justifyContent="center"
                    >
                      <VStack paddingY="20px" spacing="5">
                        <Avatar size="lg" src={admin.profile} />
                        <VStack>
                          <Text fontSize="sm">{admin.username}</Text>
                          <Text fontSize="xs">{admin.name}</Text>
                        </VStack>
                        <Button
                          as={NavLink}
                          to="/admin/edit-profile"
                          colorScheme="teal"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            onClose();
                          }}
                        >
                          <EditIcon />
                          <Text px="5px">Manage Profile</Text>
                        </Button>
                      </VStack>
                    </MenuItem>
                    <MenuItem
                      onClick={handleLogout}
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Text>Logout</Text>
                      <Icon
                        aria-label="logout"
                        as={MdExitToApp}
                        boxSize={6}
                        marginLeft="2"
                      />
                    </MenuItem>
                  </MenuList>
                </>
              );
            }}
          </Menu>
        </Stack>
      </Flex>
    </Box>
  );
};
