import { Box, Flex, Heading, Text, Card, CardBody, Stack, Icon, Progress, Button } from "@chakra-ui/react";
import { FiFile, FiLock, FiUnlock } from "react-icons/fi";
import { FaRegFileArchive } from "react-icons/fa";
import Sidebar from "@/components/sidebar";

const Dashboard = () => {
     // Dummy data untuk recent files
     // const recentFiles = [
     //      { id: 1, name: "document.pdf", type: "Encrypted", date: "2023-10-05" },
     //      { id: 2, "image.png": "Decrypted", date: "2023-10-04" },
     // ];

     return (
          <>
               <Sidebar />
               <Box p="6" ml={{ base: 0, md: "240px" }}>
                    {/* Header */}
                    <Flex justifyContent="space-between" mb="8">
                         <Box>
                              <Heading size="lg" mb="2">Dashboard</Heading>
                              <Text color="gray.500">Welcome back, User 👋</Text>
                         </Box>
                         <Button colorScheme="teal">
                              <FiLock />
                              Encrypt Now
                         </Button>
                    </Flex>

                    {/* Quick Actions */}
                    <Flex gap="6" mb="8" flexWrap="wrap">
                         <Card.Root w={{ base: "100%", md: "48%" }} boxShadow="sm">
                              <Card.Body>
                                   <Stack>
                                        <Flex align="center" gap="3">
                                             <Icon as={FiLock} boxSize="6" color="teal.500" />
                                             <Heading size="md">Encrypt File</Heading>
                                        </Flex>
                                        <Text color="gray.500">Secure your files with AES encryption and hide them in images.</Text>
                                        <Button variant="outline" colorScheme="teal">
                                             <FiFile />
                                             Choose File
                                        </Button>
                                   </Stack>
                              </Card.Body>
                         </Card.Root>

                         <Card.Root w={{ base: "100%", md: "48%" }} boxShadow="sm">
                              <CardBody>
                                   <Stack>
                                        <Flex align="center" gap="3">
                                             <Icon as={FiUnlock} boxSize="6" color="teal.500" />
                                             <Heading size="md">Decrypt File</Heading>
                                        </Flex>
                                        <Text color="gray.500">Extract and decrypt files from steganographic images.</Text>
                                        <Button variant="outline" colorScheme="teal" >
                                             <FaRegFileArchive />
                                             Extract File
                                        </Button>
                                   </Stack>
                              </CardBody>
                         </Card.Root>
                    </Flex>

                    {/* Recent Files */}
                    <Card.Root boxShadow="sm" mb="6">
                         <CardBody>
                              <Heading size="md" mb="4">Recent Files</Heading>
                              {/* <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Filename</Th>
                <Th>Type</Th>
                <Th>Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {recentFiles.map((file) => (
                <Tr key={file.id}>
                  <Td>{file.name}</Td>
                  <Td>
                    <Text
                      color={file.type === "Encrypted" ? "teal.500" : "orange.500"}
                    >
                      {file.type}
                    </Text>
                  </Td>
                  <Td>{file.date}</Td>
                  <Td>
                    <Button size="sm" variant="ghost" >
                    <FiDownload />
                      Download
                    </Button>
                    <Button size="sm" variant="ghost" colorScheme="red" >
                    <FiTrash2 />
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table> */}
                         </CardBody>
                    </Card.Root>

                    {/* Statistics */}
                    <Flex gap="6" flexWrap="wrap">
                         <Card.Root w={{ base: "100%", md: "48%" }} boxShadow="sm">
                              <CardBody>
                                   <Flex justify="space-between" align="center">
                                        <Box>
                                             <Text color="gray.500">Total Encrypted Files</Text>
                                             <Heading size="lg">15</Heading>
                                        </Box>
                                        <Progress.Root variant="outline">
                                             <Progress.Track>
                                                  <Progress.Range />
                                             </Progress.Track>
                                        </Progress.Root>
                                   </Flex>
                              </CardBody>
                         </Card.Root>

                         <Card.Root w={{ base: "100%", md: "48%" }} boxShadow="sm">
                              <CardBody>
                                   <Flex justify="space-between" align="center">
                                        <Box>
                                             <Text color="gray.500">Total Decrypted Files</Text>
                                             <Heading size="lg">8</Heading>
                                        </Box>
                                        <Progress.Root variant="subtle">
                                             <Progress.Track>
                                                  <Progress.Range />
                                             </Progress.Track>
                                        </Progress.Root>

                                   </Flex>
                              </CardBody>
                         </Card.Root>
                    </Flex>
               </Box>
          </>

     );
};

export default Dashboard;