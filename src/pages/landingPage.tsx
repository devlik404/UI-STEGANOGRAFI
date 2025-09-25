import { PasswordInput } from '@/components/ui/password-input';
import {
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Icon,
  Input,
  InputGroup,
} from '@chakra-ui/react'
import { FaLaptopCode } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { LuLock } from 'react-icons/lu';
import { MdOutlineMailOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';



export default function LandingPage() {
  // const navigate = useNavigate();

  return (
    <Flex h="100vh" w="100%">
      {/* Left Section (Dark) */}
      <Box
        flex="0.5"
        bg="blue"
        color="white"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={10}
      >
        {/* Placeholder Illustration */}
        <Box mb={6}>
          {/* Replace with actual image/illustration if needed */}
          <Icon as={FaLaptopCode} boxSize={20} />
        </Box>
        <Heading size="lg" mb={4}>
          Welcome!
        </Heading>
        <Text textAlign="center" maxW="sm" fontSize="md" color="gray.300">
          Your data is protected using modern encryption and steganography. We
          simplify high-level security for you.
        </Text>
      
      </Box>

      {/* Right Section (Light) */}
      <Box
        flex="1"
        bg="white"
        p={10}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Heading mb={4} color="gray.700">
          CRYPTO <span style={{ color: "#3A86FF" }}>STEGO</span>
        </Heading>
        <Text color="gray.500" mb={8}>
         You may enter. Please observe how our system works. To register, please contact the IT team.
        </Text>
        <Box width={"100%"}>

          <InputGroup startElement={<MdOutlineMailOutline />} pb={2}>
            <Input placeholder="Enter Your Email" />
          </InputGroup>
          <InputGroup startElement={<LuLock />} pb={2}>

            <PasswordInput />
          </InputGroup>
        </Box>
        <Box w="100%" maxW="300px">
          <Stack wordSpacing={4}>
            <Link to="/main" >
              <Button
                colorScheme="gray"
                variant="outline"
                size="lg"
                w="100%"
              >

                Login your Account
              </Button>
            </Link>
            {/* <Button
              variant="outline"
              size="lg"
              w="100%"

            >
              <FcGoogle /> Sign in with Google
            </Button> */}
          </Stack>
        </Box>

        {/* Terms */}
        <Text mt={6} fontSize="xs" color="gray.400" maxW="sm" textAlign="center">
          By signing in with Google, you agree with our Terms of Use and Privacy Policy.
        </Text>
      </Box>
    </Flex>


  )
}
