import {
  Box,
  Flex,
  Button,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { Logo } from '../../../../shared/components/logo/Logo'
import { ThemeSwitcher } from '../../../../shared/components/theme-switcher/ThemeSwitcher'
import { Link, NavLink, useLocation } from 'react-router-dom'

export const Navbar = () => {
  const location = useLocation()
  
  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex flex={{ base: 1 }} justify={{ base: 'start', md: 'start' }}>
        <Link to={'/'}>
          <Logo h="30px"/>
          </Link>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
          </Flex>
        </Flex>
        <Stack
          flex={{ base: 1, md: 1 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <ThemeSwitcher></ThemeSwitcher>
          {location.pathname != '/auth/login' && <Button as={NavLink} to="/auth/login" fontSize={'sm'} fontWeight={400} variant={'link'} >
            Login
          </Button>}
          {location.pathname != '/auth/register' && <Button
            as={NavLink} 
            to="/auth/register"
            display={{ base: 'inline-flex', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'teal.500'}
            _hover={{
              bg: 'green.500',
            }}>
            Register
          </Button>}
        </Stack>
      </Flex>

    </Box>
  )
}

