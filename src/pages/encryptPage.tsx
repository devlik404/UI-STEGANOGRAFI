import { Box, Button, Card, CardBody, Flex, Heading, Icon, Input, Stack, Text } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiCheckCircle, FiDownload, FiFile, FiImage, FiLock } from "react-icons/fi";
import { IconType } from "react-icons";
import { Accept } from 'react-dropzone';
import Sidebar from "@/components/sidebar";
import { usePost } from "@/hooks/encrypt";
import { BsFileEarmarkZipFill } from "react-icons/bs";


interface CardDropzoneProps {
     icon: IconType;
     title: string;
     accept?: Accept; // Ganti dari string ke Accept
     onDrop: (files: File[]) => void;
     acceptedFiles: string;
}

const EncryptPage = () => {
     const [selectedFile, setSelectedFile] = useState<File | null>(null);
     const [selectedImage, setSelectedImage] = useState<File | null>(null);
     const [password, setPassword] = useState("");
     const [showPassword, setShowPassword] = useState(false);
     const [activeStep, setActiveStep] = useState(0);
     const [loading, setLoading] = useState(false);
     const { handleEncrypt, setContent } = usePost()


     const steps = [
          { id: 1, title: 'Upload File', description: 'Select the file to encrypt' },
          { id: 2, title: 'Choose Image', description: 'Select image to hide data' },
          { id: 3, title: 'Set Password', description: 'Secure your encryption' },
          { id: 4, title: 'Download File', description: 'Download your file encryption' },
     ];

     const handleFileDrop = (acceptedFiles: File[]) => {
          setSelectedFile(acceptedFiles[0]);
          setActiveStep(1);
     };

     const handleImageDrop = (acceptedFiles: File[]) => {
          const file = acceptedFiles[0];

          if (!file.type.startsWith("image/")) {
               alert("Hanya file gambar yang diperbolehkan pada langkah ini!");
               return;
          }
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
                                             <Icon as={FiLock} boxSize={6} color="blue.500" />
                                             <Heading size="md">Set Password</Heading>
                                        </Flex>
                                        <Input
                                             type={showPassword ? "text" : "password"}
                                             placeholder="Enter strong password"
                                             value={password}
                                             name="password"
                                             onChange={(e) => setPassword(e.target.value)}

                                        />
                                   </Stack>
                              </CardBody>
                         </Card.Root>
                    );
               case 3:
                    return (
                         <Card.Root mt={"4"}>
                              <CardBody>
                                   <Stack wordSpacing={4}>
                                        <Flex direction="row" align="center" gap={4}>
                                             {/* Icon file zip */}
                                             <Box boxSize={12}>
                                                  <Icon as={BsFileEarmarkZipFill} boxSize={12} color="blue.600" />
                                             </Box>

                                             {/* File info */}
                                             <Stack wordSpacing={1} flex="1">
                                                  <Text fontWeight="bold" fontSize="sm" >
                                                       this_file_has_a_long&_dummy_name.zip
                                                  </Text>
                                                  <Text fontSize="xs" color="gray.500">
                                                       by username
                                                  </Text>
                                                  <Text fontSize="xs" color="gray.500">
                                                       29 Feb 2016 &nbsp; 14:45:20
                                                  </Text>
                                             </Stack>

                                             {/* Download icon */}
                                             <Button
                                                  variant="ghost"
                                                  colorScheme="blue"
                                                  borderRadius="full"
                                                  p={2}
                                                  minW="auto"
                                             >
                                                  <Icon as={FiDownload} boxSize={6} />
                                             </Button>
                                        </Flex>
                                   </Stack>
                              </CardBody>
                         </Card.Root>
                    );
               default:
                    return null;
          }
     };
     const handleSubmitEncrypt = async (e: FormEvent) => {
          e.preventDefault();
          setLoading(true);

          // Set data ke hook
          setContent({
               file: selectedFile,
               image: selectedImage,
               password: password
          });

          // Tunggu sebentar agar state benar-benar terset (opsional safety)
          setTimeout(async () => {
               await handleEncrypt(e);
               setLoading(false);
               setActiveStep(3); // lanjut ke download
          }, 100); // tambahkan delay kecil
     };

     return (
          <>
               <form onSubmit={handleEncrypt}>
                    <Sidebar />
                    <Box p={6} ml={{ base: 0, md: "240px" }}  >
                         {/* Header */}
                         <Flex justifyContent="space-between" mb="8">
                              <Box>
                                   <Heading size="lg" mb="2">Encrypt Page</Heading>
                              </Box>

                         </Flex>
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
                                                       bg={activeStep >= index ? "#2B65D9" : "#334155"}
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
                                             onClick={handleSubmitEncrypt}
                                             loading={loading} // <- perbaiki ini
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
               </form>
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

export default EncryptPage;