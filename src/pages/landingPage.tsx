import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';



export default function LandingPage() {
     const navigate = useNavigate();

  return (
    <Container>
      <Stack
        align={'center'}
        py={{ base: '40', md: '36' }}
        direction={{ base: 'column', md: 'row' }}>
        <Stack flex={1} pr={"5"} >
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '50%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'teal.400',
                zIndex: -1,
              }}>
              secure once,
            </Text>
            <br />
            <Text as={'span'} color={'teal.400'}>
            save everywhere!
            </Text>
          </Heading>
          <Text color={'gray.500'}>
          File encryption app with steganography integration that lets you secure your data with ease. With advanced encryption technology and data hiding on digital media, you can protect sensitive files from unwanted access.
          </Text>
          <Stack direction={{ base: 'column', sm: 'row' }} pt={"5"}>
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              colorScheme={'teal'}
              bg={'teal.400'}
              _hover={{ bg: 'teal.500' }}
              onClick={() => navigate("/main")}>
          
              Get started
            </Button>
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
          //     _icon={<PlayIcon h={4} w={4} color={'gray.300'} />}
              >
              How It Works
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}>
 
          <Box
            position={'relative'}
            height={'300px'}
            rounded={'2xl'}
            boxShadow={'2xl'}
            width={'full'}
            overflow={'hidden'}>
          
            <Image
              alt={'Hero Image'}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
              src={
                'https://media.istockphoto.com/id/2163506577/id/foto/konsep-keselamatan-dan-kepatuhan-kerja-pengusaha-memegang-kaca-pembesar-dengan-ikon.jpg?s=1024x1024&w=is&k=20&c=bEsnRmqgun8sJiwJSGY9Y80p7neVaD_8z6kK9H1dxa4='
              }
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  )
}
