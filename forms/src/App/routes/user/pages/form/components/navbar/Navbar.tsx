import {
    Box,
    Flex,
    Stack,
    useColorModeValue,
  } from '@chakra-ui/react'
  import { Logo } from '../../../../../../../shared/components/logo/Logo'
  import { ThemeSwitcher } from '../../../../../../../shared/components/theme-switcher/ThemeSwitcher'
  import { Link } from 'react-router-dom'
  
  export const Navbar = () => {
    
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
          </Stack>
        </Flex>
  
      </Box>
    )
  }
  
  