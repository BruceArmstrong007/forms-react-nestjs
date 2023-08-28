import {
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Box,
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { Navbar } from '../../../App/routes/auth/Navbar'

export const LandingPage = () => {
  return (
    <Box w="full" h="100vh">
    <Navbar/>
    
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Creating and Sharing Online Forms{' '}
          <Text as={'span'} color={'teal.500'}>
            made easy
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
        Empower Yourself to Easily Create and Share Custom Online Forms, Collecting Precise Data Effortlessly from Anyone, Anytime.
        </Text>
      </Stack>
    </Container>
    </Box>
  )
}