import { Box, Flex, Heading, Text, Card, CardBody, Stack, Icon, Progress, Button } from "@chakra-ui/react";
import { FiFile, FiLock, FiUnlock } from "react-icons/fi";
import { FaRegFileArchive } from "react-icons/fa";
import Sidebar from "@/components/sidebar";
import { Link } from "react-router-dom";

const Dashboard = () => {


     return (
          <>
               <Sidebar />
               <Box p="6" ml={{ base: 0, md: "240px" }}>
                    {/* Header */}
                    <Flex justifyContent="space-between" mb="8">
                         <Box>
                              <Heading size="lg" mb="2">Dashboard</Heading>
                         </Box>

                    </Flex>

                    {/* Quick Actions */}
                    <Flex gap="6" mb="8" flexWrap="wrap">
                         <Card.Root w={{ base: "100%", md: "48%" }} boxShadow="sm">
                              <Card.Body>
                                   <Stack>
                                        <Flex align="center" gap="3">
                                             <Icon as={FiLock} boxSize="6" color="#3A86FF" />
                                             <Heading size="md">Encrypt File</Heading>
                                        </Flex>
                                        <Text color="gray.500">Secure your files with AES encryption and hide them in images.</Text>
                                        <Button variant="outline" colorScheme="teal">
                                             <Link to="/decrypt" >
                                                  <Box display={"flex"} gap={2}>
                                                       <FiFile />
                                                       <Text>
                                                            Encrypt File
                                                       </Text>
                                                  </Box>
                                             </Link>
                                        </Button>
                                   </Stack>
                              </Card.Body>
                         </Card.Root>

                         <Card.Root w={{ base: "100%", md: "48%" }} boxShadow="sm">
                              <CardBody>
                                   <Stack>
                                        <Flex align="center" gap="3">
                                             <Icon as={FiUnlock} boxSize="6" color="#3A86FF" />
                                             <Heading size="md">Decrypt File</Heading>
                                        </Flex>
                                        <Text color="gray.500">Extract and decrypt files from steganographic images.</Text>
                                        <Button variant="outline" colorScheme="teal" >
                                             <Link to="/encrypt" >
                                                  <Box display={"flex"} gap={2}>
                                                       <FaRegFileArchive />
                                                       <Text>
                                                            Extract File
                                                       </Text>
                                                  </Box>
                                             </Link>
                                        </Button>
                                   </Stack>
                              </CardBody>
                         </Card.Root>
                    </Flex>

                    {/* Recent Files */}
                    <Card.Root boxShadow="sm" mb="6">
                         <CardBody>
                              <Heading size="md" mb="4">Total Asset Files</Heading>

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