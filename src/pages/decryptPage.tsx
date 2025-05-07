import { toaster } from "@/components/ui/toaster";
import { Box, Button, Card, CardBody, Flex, Heading, Icon, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiCheckCircle, FiFile, FiImage, FiLock } from "react-icons/fi";
import { IconType } from "react-icons";
import { Accept } from 'react-dropzone'; // Import tipe Accept
import Sidebar from "@/components/sidebar";


interface CardDropzoneProps {
     icon: IconType;
     title: string;
     accept?: Accept; // Ganti dari string ke Accept
     onDrop: (files: File[]) => void;
     acceptedFiles: string;
}

const DecryptPage = () => {
     const [selectedFile, setSelectedFile] = useState<File | null>(null);
     const [selectedImage, setSelectedImage] = useState<File | null>(null);
     const [password, setPassword] = useState("");
     const [showPassword, setShowPassword] = useState(false);
     const [activeStep, setActiveStep] = useState(0);
     const [loading, setLoading] = useState(false);

     const steps = [
          { id: 1, title: 'Upload File', description: 'Select the file to encrypt' },
          { id: 3, title: 'Set Password', description: 'Secure your encryption' },
     ];

     const handleFileDrop = (acceptedFiles: File[]) => {
          setSelectedFile(acceptedFiles[0]);
          setActiveStep(1);
     };

     const handleImageDrop = (acceptedFiles: File[]) => {
          setSelectedImage(acceptedFiles[0]);
          setActiveStep(2);
     };

     const handleNext = () => {
          if (activeStep < steps.length - 1) {
               setActiveStep(activeStep + 1);
          }
     };

     const handlePrevious = () => {
          if (activeStep > 0) {
               setActiveStep(activeStep - 1);
          }
     };

     const handleEncrypt = async () => {
          if (!selectedFile || !selectedImage || !password) {
               toaster.create({
                    title: "Missing Requirements",
                    description: "Please complete all steps",

               });
               return;
          }

          setLoading(true);
          await new Promise(resolve => setTimeout(resolve, 2000));
          setLoading(false);
          toaster.create({
               title: "Success",
               description: "File encrypted and hidden successfully!",

          });
     };

     const renderStepContent = () => {
          switch (activeStep) {
               case 0:
                    return (
                         <CardDropzone
                              icon={FiFile}
                              title="Drag & Drop File"
                              onDrop={handleFileDrop}
                              acceptedFiles={selectedFile?.name || "No file selected"}
                         />
                    );
               case 1:
                    return (
                         <CardDropzone
                              icon={FiImage}
                              title="Drag & Drop Image"
                              // accept="image/*"
                              onDrop={handleImageDrop}
                              acceptedFiles={selectedImage?.name || "No image selected"}
                         />
                    );
               case 2:
                    return (
                         <Card.Root>
                              <CardBody>
                                   <Stack wordSpacing={4}>
                                        <Flex align="center" gap={3}>
                                             <Icon as={FiLock} boxSize={6} color="teal.500" />
                                             <Heading size="md">Set Password</Heading>
                                        </Flex>
                                        <Input
                                        //  type={showPassword ? "text" : "password"}
                                        //  placeholder="Enter strong password"
                                        //  value={password}
                                        //  onChange={(e) => setPassword(e.target.value)}
                                        //  rightElement={
                                        //    <InputRightElement>
                                        //      <IconButton
                                        //        aria-label="Toggle password visibility"
                                        //        icon={showPassword ? <FiEyeOff /> : <FiEye />}
                                        //        onClick={() => setShowPassword(!showPassword)}
                                        //        variant="ghost"
                                        //      />
                                        //    </InputRightElement>
                                        //  }
                                        />
                                   </Stack>
                              </CardBody>
                         </Card.Root>
                    );
               default:
                    return null;
          }
     };

     return (
          <>
               <Sidebar />
               <Box p={6} ml={{ base: 0, md: "240px" }}  >
                    {/* Stepper Custom */}
                    <Box divideY="2px">
                         <Flex gap={4} mb={8} mt={"10"} >
                              {steps.map((step, index) => (
                                   <Box key={step.id} flex={1}>
                                        <Flex justify={"center"} align="center" gap={2} >
                                             <Box
                                                  w={8}
                                                  h={8}
                                                  borderRadius="full"
                                                  bg={activeStep >= index ? "teal.500" : "gray.200"}
                                                  color="white"
                                                  display="flex"
                                                  alignItems="center"
                                                  justifyContent="center"
                                             >
                                                  {activeStep >= index ? (
                                                       <Icon as={FiCheckCircle} />
                                                  ) : (
                                                       step.id
                                                  )}
                                             </Box>
                                             <Box>
                                                  <Text fontWeight="bold">{step.title}</Text>
                                                  <Text fontSize="sm" color="gray.500">
                                                       {step.description}
                                                  </Text>
                                             </Box>
                                        </Flex>
                                        {/* {index < steps.length - 1 && (
                 <Divider 
                   borderColor={activeStep > index ? "teal.500" : "gray.200"}
                   mt={2}
                 />
               )} */}
                                   </Box>
                              ))}
                         </Flex>
                         <Box>
                              {/* Konten Utama */}
                              {renderStepContent()}

                              {/* Navigation Buttons */}
                              <Flex mt={6} gap={4} justifyContent="flex-end">
                                   <Button
                                        variant="outline"
                                        onClick={handlePrevious}
                                   //    isDisabled={activeStep === 0}
                                   >
                                        Previous
                                   </Button>

                                   <Button
                                        colorScheme="red"
                                        // leftIcon={loading ? <Progress size="xs" isIndeterminate /> : <FiCheckCircle />}
                                        onClick={handleEncrypt}
                                        loading={loading}
                                        disabled={
                                             (activeStep === 0 && !selectedFile) ||
                                             (activeStep === 1 && !selectedImage)
                                        }
                                   >
                                        Encrypt & Hide
                                   </Button>
                                   <Button
                                        variant="outline"
                                        onClick={handleNext}
                                        disabled={
                                             (activeStep === 0 && !selectedFile) ||
                                             (activeStep === 1 && !selectedImage) ||
                                             (activeStep === 2)
                                        }
                                   >
                                        Next
                                   </Button>

                              </Flex>

                         </Box>
                    </Box>

               </Box>
          </>

     );
};

// Komponen Dropzone
const CardDropzone: React.FC<CardDropzoneProps> = ({
     icon: IconComponent,
     title,
     accept = {}, // Nilai default diubah ke objek kosong
     onDrop,
     acceptedFiles
}) => {
     const { getRootProps, getInputProps, isDragActive } = useDropzone({
          onDrop: (files) => onDrop(files),
          accept: accept, // Gunakan properti accept
          multiple: false
     });

     return (
          <>
               <Sidebar />
               <Box p="10">
                    <Card.Root
                         borderWidth="2px"
                         borderRadius="lg"
                         _hover={{ borderColor: "teal.500" }}
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
                                        color="teal.500"
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

export default DecryptPage;