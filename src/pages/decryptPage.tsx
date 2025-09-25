import { toaster } from "@/components/ui/toaster";
import {
     Box,
     Button,
     Card,
     CardBody,
     Dialog,
     Flex,
     Heading,
     Icon,
     Input,
     Stack,
     Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiCheckCircle, FiImage, FiLock } from "react-icons/fi";
import { IconType } from "react-icons";
import { Accept } from "react-dropzone";
import Sidebar from "@/components/sidebar";
import { handleDecryptPost } from "@/hooks/handleDecrypt";

interface CardDropzoneProps {
     icon: IconType;
     title: string;
     accept?: Accept;
     onDrop: (files: File[]) => void;
     acceptedFiles: string;
}

const DecryptPage = () => {
     const [selectedImage, setSelectedImage] = useState<File | null>(null);
     const [password, setPassword] = useState("");
     // const [showPassword, setShowPassword] = useState(false);
     const [activeStep, setActiveStep] = useState(0);
     const [loading, setLoading] = useState(false);

     const [previewUrl, setPreviewUrl] = useState<string | null>(null);
     const [openPreview, setOpenPreview] = useState(false);

     const { handleRequestDecrypt } = handleDecryptPost();

     const steps = [
          { id: 1, title: "Upload Image", description: "Select the encrypted image" },
          { id: 2, title: "Set Password", description: "Enter your password" },
     ];

     const handleImageDrop = (acceptedFiles: File[]) => {
          setSelectedImage(acceptedFiles[0]);
          setActiveStep(1);
     };

     const handlePrevious = () => {
          if (activeStep > 0) setActiveStep(activeStep - 1);
     };

     const handleDecrypt = async () => {
          if (!selectedImage || !password) {
               toaster.create({
                    title: "Missing Requirements",
                    description: "Please select image and enter password",
               });
               return;
          }

          setLoading(true);
          try {
               const res = await handleRequestDecrypt({
                    image: selectedImage,
                    password: password,
               });

               if (res?.data.previewUrl) {

                    const fileUrl = `http://localhost:8080${res.data.previewUrl}`;

                    // fetch file  blob
                    const response = await fetch(fileUrl, { method: "GET" });
                    if (!response.ok) throw new Error("Failed to fetch preview file");

                    const blob = await response.blob();
                    const objectUrl = URL.createObjectURL(blob);
                    setPreviewUrl(objectUrl);
                    setOpenPreview(true);

                    toaster.create({
                         title: "Success",
                         description: "File decrypted successfully. Preview available.",
                    });
               }
          } catch (err) {
               console.error("Decrypt error:", err);
               toaster.create({
                    title: "Error",
                    description: "Failed to decrypt file.",
               });
          } finally {
               setLoading(false);
          }
     };

     const renderStepContent = () => {
          switch (activeStep) {
               case 0:
                    return (
                         <CardDropzone
                              icon={FiImage}
                              title="Drag & Drop Encrypted Image"
                              onDrop={handleImageDrop}
                              acceptedFiles={selectedImage?.name || "No image selected"}
                         />
                    );
               case 1:
                    return (
                         <Card.Root>
                              <CardBody>
                                   <Stack gap={4}>
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
               default:
                    return null;
          }
     };

     return (
          <>
               <Sidebar />
               <Box p={6} ml={{ base: 0, md: "240px" }}>
                    {/* Header */}
                    <Flex justifyContent="space-between" mb="8">
                         <Box>
                              <Heading size="lg" mb="2">
                                   Decrypt Page
                              </Heading>
                         </Box>
                    </Flex>

                    {/* Stepper */}
                    <Box divideY="2px">
                         <Flex gap={4} mb={8} mt={"10"}>
                              {steps.map((step, index) => (
                                   <Box key={step.id} flex={1}>
                                        <Flex justify={"center"} align="center" gap={2}>
                                             <Box
                                                  w={8}
                                                  h={8}
                                                  borderRadius="full"
                                                  bg={activeStep >= index ? "blue.500" : "gray.200"}
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

                         {/* Main Content */}
                         <Box>
                              {renderStepContent()}

                              {/* Navigation Buttons */}
                              <Flex mt={6} gap={4} justifyContent="flex-end">
                                   <Button variant="outline" onClick={handlePrevious} disabled={activeStep === 0}>
                                        Previous
                                   </Button>

                                   {activeStep === 1 ? (
                                        <Button colorScheme="blue" onClick={handleDecrypt} loading={loading}>
                                             Decrypt
                                        </Button>
                                   ) : (
                                        <Button
                                             variant="outline"
                                             onClick={() => setActiveStep(activeStep + 1)}
                                             disabled={!selectedImage}
                                        >
                                             Next
                                        </Button>
                                   )}
                              </Flex>
                         </Box>
                    </Box>
               </Box>

               {/* Dialog Preview */}
               <Dialog.Root open={openPreview} onOpenChange={(e) => {
                    setOpenPreview(e.open);
                    if (!e.open && previewUrl) {
                         toaster.create({
                              title: "Success",
                              description: "File closed/downloaded successfully.",
                         });
                    }
                    setActiveStep(0);
                    setSelectedImage(null);
                    setPassword("");
                    setPreviewUrl(null);
               }}>   <Dialog.Backdrop />
                    <Dialog.Positioner>
                         <Dialog.Content className="max-w-3xl">
                              <Dialog.CloseTrigger />
                              <Dialog.Header>
                                   <Dialog.Title>Preview File</Dialog.Title>
                              </Dialog.Header>

                              <Dialog.Body>
                                   {previewUrl && (
                                        <iframe
                                             src={previewUrl}
                                             width="100%"
                                             height="500px"
                                             className="rounded-lg border"
                                        />
                                   )}

                              </Dialog.Body>

                         </Dialog.Content>
                    </Dialog.Positioner>
               </Dialog.Root>
          </>
     );
};

// Dropzone component
const CardDropzone: React.FC<CardDropzoneProps> = ({
     icon: IconComponent,
     title,
     accept = {},
     onDrop,
     acceptedFiles,
}) => {
     const { getRootProps, getInputProps, isDragActive } = useDropzone({
          onDrop: (files) => onDrop(files),
          accept: accept,
          multiple: false,
     });

     return (
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
                              <Icon as={IconComponent} boxSize={12} color="blue.500" mb={4} />
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
     );
};

export default DecryptPage;
