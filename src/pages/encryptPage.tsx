import { Box, Button, Card, CardBody, Flex, Heading, Icon, Input, Stack, Text } from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { FiCheckCircle, FiDownload, FiFile, FiImage, FiLock } from "react-icons/fi";
import Sidebar from "@/components/sidebar";
import { usePost } from "@/hooks/encrypt";
import { BsFileEarmarkZipFill } from "react-icons/bs";
import { CardDropzone } from "@/components/cardDropZone";
import { toaster } from "@/components/ui/toaster";


const EncryptPage = () => {
     const [selectedFile, setSelectedFile] = useState<File | null>(null);
     const [selectedImage, setSelectedImage] = useState<File | null>(null);
     const [password, setPassword] = useState("");
     const [activeStep, setActiveStep] = useState(0);
     const [loading, setLoading] = useState(false);
     const { handleEncrypt, res } = usePost()
     const [isSuccess, setIsSuccess] = useState(false);


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

     const handleDownload = () => {
          const imageUrl = res.url;
          window.electron.downloadFile(imageUrl);
     };
     useEffect(() => {
          const removeDone = window.electron.onDownloadDone((path) => {
               toaster.create({
                    title: "Success",
                    description: "Save File successfully. " + path,
               });
          });

          const removeFailed = window.electron.onDownloadFailed((err) => {
               toaster.create({
                    title: "Failed",
                    description: "Download File Failed. " + err,
               });
          });

        
          return () => {
               removeDone();
               removeFailed();
          };
     }, []);


     const handleSubmitEncrypt = async (e: FormEvent) => {
          e.preventDefault();
          setLoading(true);


          const response = await handleEncrypt(e, {
               file: selectedFile,
               image: selectedImage,
               password: password,
          });

          setLoading(false);

          if (response?.status === 200) {
               setIsSuccess(true);
               setActiveStep(3);
               toaster.create({
                    title: "Success",
                    description: "File encrypted successfully. Download available.",
               });
          }
     };


     const handleReset = () => {

          setSelectedFile(null);
          setSelectedImage(null);
          setPassword("");
          setIsSuccess(false);
          setActiveStep(0);
     };

     //STEP UI
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
                                             // type={showPassword ? "text" : "password"}
                                             type="password"
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
                         <Card.Root mt="4">
                              <CardBody>

                                   <Flex align="center" gap={4}>
                                        {/* Icon file zip */}
                                        <Box boxSize={12}>
                                             <Icon as={BsFileEarmarkZipFill} boxSize={12} color="blue.600" />
                                        </Box>

                                        {/* File info */}
                                        <Stack gap={1} flex="1" minW={0}>
                                             <Text fontWeight="bold" fontSize="sm" className="truncate">
                                                  {res.url}
                                             </Text>

                                        </Stack>
                                        <Button
                                             variant="ghost"
                                             borderRadius="full"
                                             p={2}
                                             minW="auto"
                                             onClick={handleDownload}
                                        >
                                             <FiDownload size={20} />
                                        </Button>
                                   </Flex>
                              </CardBody>
                         </Card.Root>

                    );
               default:
                    return null;
          }
     };


     return (
          <>
               <form>
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
                                        {!isSuccess ? (
                                             <>
                                                  <Button variant="outline" onClick={handlePrevious}>
                                                       Previous
                                                  </Button>

                                                  <Button
                                                       colorScheme="red"
                                                       onClick={handleSubmitEncrypt}
                                                       loading={loading}
                                                       disabled={
                                                            (activeStep === 0 && !selectedFile) ||
                                                            (activeStep === 1 && !selectedImage) ||
                                                            (password === null || !password)
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
                                                            activeStep === 2
                                                       }
                                                  >
                                                       Next
                                                  </Button>
                                             </>
                                        ) : (
                                             <Button colorScheme="blue" onClick={handleReset}>
                                                  Encrypt Lagi
                                             </Button>
                                        )}
                                   </Flex>


                              </Box>
                         </Box>

                    </Box>
               </form>
          </>

     );
};



export default EncryptPage;