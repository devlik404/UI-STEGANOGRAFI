import { Box, Flex, Text, Link, Icon } from "@chakra-ui/react";
import { RiHome2Line } from "react-icons/ri";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { BiLockAlt, BiLockOpenAlt } from "react-icons/bi";
import { TbFolderSearch } from "react-icons/tb";

const Sidebar = () => {
  
  // Sidebar Desktop
  return (
    <Box
      bg="#3A86FF"
      w="240px"
      h="100vh"
      position="fixed"
      left="0"
      top="0"
      transition="width 0.3s"

    >
      <Flex direction="column" p="4" gap="4" >
        {/* Logo/Header */}
        <Text fontSize="xl" fontWeight="bold" color="#FFFFFF">
        CryptoStego
        </Text>

        {/* Navigasi */}
        <Link href="/main" color="#E0E0E0">
      <Flex align="center" gap={3} py={2}>
        <Icon as={RiHome2Line} boxSize={5} color="#DDE6ED" />
        <Text>Dashboard</Text>
      </Flex>
    </Link>

    <Link href="/encrypt" color="#E0E0E0">
      <Flex align="center" gap={3} py={2}>
        <Icon as={BiLockAlt} boxSize={5} color="#DDE6ED" />
        <Text>Encrypt</Text>
      </Flex>
    </Link>

    <Link href="/decrypt" color="#E0E0E0">
      <Flex align="center" gap={3} py={2}>
        <Icon as={BiLockOpenAlt} boxSize={5} color="#DDE6ED" />
        <Text>Decrypt</Text>
      </Flex>
    </Link>

    {/* <Link href="/docs" color="#E0E0E0">
      <Flex align="center" gap={3} py={2}>
        <Icon as={HiOutlineDocumentDuplicate} boxSize={5} color="#DDE6ED" />
        <Text>Document</Text>
      </Flex>
    </Link> */}

    <Link href="/folders" color="#E0E0E0">
      <Flex align="center" gap={3} py={2}>
        <Icon as={TbFolderSearch} boxSize={5} color="#DDE6ED" />
        <Text>Assets</Text>
      </Flex>
    </Link>
      </Flex>
    </Box>
  );
};

export default Sidebar;