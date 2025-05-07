import { Box, Flex, IconButton, useDisclosure, Text, Link, useBreakpointValue, Icon } from "@chakra-ui/react";
import { FiMenu, FiX } from "react-icons/fi";
import { RiHome2Line } from "react-icons/ri";
import { CiLock, CiUnlock } from "react-icons/ci";
import { HiOutlineDocumentSearch } from "react-icons/hi";

const Sidebar = () => {
  
  // Sidebar Desktop
  return (
    <Box
      bg="gray.900"
      w="240px"
      h="100vh"
      position="fixed"
      left="0"
      top="0"
      transition="width 0.3s"

    >
      <Flex direction="column" p="4" gap="4" >
        {/* Logo/Header */}
        <Text fontSize="xl" fontWeight="bold" color="whiteAlpha.700">
        CryptoStego
        </Text>

        {/* Navigasi */}
        <Link href="/main" color="whiteAlpha.700">
        <Icon as={RiHome2Line} boxSize="6" color="teal.500" />Dashboard
        </Link>
        <Link href="/encrypt" color="whiteAlpha.700">
        <Icon as={CiLock } boxSize="6" color="teal.500" />Encrypt
        </Link>
        <Link href="/decrypt" color="whiteAlpha.700">
        <Icon as={CiUnlock } boxSize="6" color="teal.500" /> Decrypt
        </Link>
        <Link href="/docs" color="whiteAlpha.700">
        <Icon as={HiOutlineDocumentSearch } boxSize="6" color="teal.500" />Document
        </Link>
      </Flex>
    </Box>
  );
};

export default Sidebar;