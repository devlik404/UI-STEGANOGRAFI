import { CardDropzoneProps } from "@/utils/interface";
import { Box, Card, CardBody, Icon,Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import Sidebar from "./sidebar";

// Komponen Dropzone
export const CardDropzone: React.FC<CardDropzoneProps> = ({
     icon: IconComponent,
     title,
     accept = {}, 
     onDrop,
     acceptedFiles
}) => {
     const { getRootProps, getInputProps, isDragActive } = useDropzone({
          onDrop: (files) => onDrop(files),
          accept: accept, 
          multiple: false
     });

     return (
          <>
               <Sidebar />
               <Box p="10">
                    <Card.Root
                         borderWidth="2px"
                         borderRadius="lg"
                         _hover={{ borderColor: "blue.500" }}
                         transition="all 0.2s"
                         bg={isDragActive ? "gray.50" : "white"}
                         p={"20"}
                    >
                         <CardBody textAlign="center" {...getRootProps()}>
                              <input {...getInputProps()} />
                              <Box>
                                   <Icon
                                        as={IconComponent}
                                        boxSize={12}
                                        color="blue.500"
                                        mb={4}
                                   />
                              </Box>

                              <Text fontWeight="bold">{title}</Text>
                              <Text color="gray.500">
                                   {isDragActive ? "Release to drop" : "or click to select"}
                              </Text>
                              <Text mt={4} fontSize="sm" color="gray.600">
                                   {acceptedFiles}
                              </Text>
                         </CardBody>
                    </Card.Root>
               </Box>

          </>

     );
};