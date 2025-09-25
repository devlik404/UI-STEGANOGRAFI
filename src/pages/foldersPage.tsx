import Sidebar from "@/components/sidebar";
import {
     Box,
     Text,
     Image,
     Table,
     Flex,
     Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectionToolbar } from "@/components/atom/selectionToolbar";
import { handleGetEncrypt } from "@/hooks/getEncrypt";



const FolderPages = () => {
     const [assets, setAssets] = useState<any[]>([]);
     const [selection, setSelection] = useState<number[]>([]);
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 5;

     const indeterminate = selection.length > 0 && selection.length < assets.length;
     const selectedAssets = assets.filter((a) => selection.includes(a.id));
 

     useEffect(() => {
          const handleGetFiles = async () => {
               try {
                    const res = await handleGetEncrypt();
                    const mapped = res.data.results.map((item: any) => ({
                         id: item.id,
                         name: item.fileName,
                         size: `${(item.fileSize / 1024).toFixed(2)} KB`,
                         originalName: item.fileName,
                         uploadDate: item.uploadDate,
                         image: item.url,
                    }));
                    setAssets(mapped);
               } catch (err) {
                    console.error(err);
               }
          };
          handleGetFiles();
     }, []);

     // Pagination
     const totalPages = Math.ceil(assets.length / itemsPerPage);
     const paginatedAssets = assets.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
     );

     return (
          <>
               <Sidebar />
               {selectedAssets.length > 0 && (
                    <Box ml={{ base: 0, md: "240px" }} p={"1"}>
                         <SelectionToolbar
                              selected={selectedAssets}
                              onClearSelection={() => setSelection([])}
                              onRefresh={async () => {
                                   const res = await handleGetEncrypt();
                                   const mapped = res.data.results.map((item: any) => ({
                                        id: item.id,
                                        name: item.fileName,
                                        size: `${(item.fileSize / 1024).toFixed(2)} KB`,
                                        originalName: item.fileName,
                                        uploadDate: item.uploadDate,
                                        image: item.url,
                                   }));
                                   setAssets(mapped);
                                   setSelection([]); 
                              }}
                         />
                    </Box>
               )}

               <Box ml={{ base: 0, md: "240px" }} p={6}>
                    <Flex justifyContent="space-between" mb="8">
                         <Box>
                              <Text fontSize="2xl" fontWeight="bold">Assets Page</Text>
                         </Box>
                    </Flex>
                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                         Showing {assets.length} assets
                    </Text>

                    <Table.Root variant={"outline"} colorPalette={"blue"}>
                         <Table.Header>
                              <Table.Row>
                                   <Table.ColumnHeader>
                                        <Checkbox
                                             checked={indeterminate ? "indeterminate" : selection.length === assets.length}
                                             onCheckedChange={(e) =>
                                                  setSelection(e.checked ? assets.map((a) => a.id) : [])
                                             }
                                             aria-label="Select all rows"
                                        />
                                   </Table.ColumnHeader>
                                   <Table.ColumnHeader>Preview</Table.ColumnHeader>
                                   <Table.ColumnHeader>Display Name</Table.ColumnHeader>
                                   <Table.ColumnHeader>Size</Table.ColumnHeader>
                                   <Table.ColumnHeader>Original Name</Table.ColumnHeader>
                                   <Table.ColumnHeader>Upload Date</Table.ColumnHeader>
                              </Table.Row>
                         </Table.Header>

                         <Table.Body>
                              {paginatedAssets.map((asset) => (
                                   <Table.Row
                                        key={asset.id}
                                        data-selected={selection.includes(asset.id) ? "" : undefined}
                                   >
                                        <Table.Cell>
                                             <Checkbox
                                                  variant={"outline"}
                                                  checked={selection.includes(asset.id)}
                                                  onCheckedChange={(e) =>
                                                       setSelection((prev) =>
                                                            e.checked ? [...prev, asset.id] : prev.filter((id) => id !== asset.id)
                                                       )
                                                  }
                                                  aria-label={`Select ${asset.name}`}
                                             />
                                        </Table.Cell>
                                        <Table.Cell>
                                             <Image
                                                  src={asset.image}
                                                  boxSize="50px"
                                                  borderRadius="md"
                                                  objectFit="cover"
                                                  border="1px solid #ccc"
                                             />
                                        </Table.Cell>
                                        <Table.Cell>{asset.name}</Table.Cell>
                                        <Table.Cell>{asset.size}</Table.Cell>
                                        <Table.Cell>{asset.originalName}</Table.Cell>
                                        <Table.Cell>{asset.uploadDate}</Table.Cell>
                                   </Table.Row>
                              ))}
                         </Table.Body>
                    </Table.Root>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                         <Flex mt={4} justifyContent="center" gap={2}>
                              <Button
                                   onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                   disabled={currentPage === 1}
                              >
                                   Previous
                              </Button>
                              <Text alignSelf="center">
                                   Page {currentPage} of {totalPages}
                              </Text>
                              <Button
                                   onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                   disabled={currentPage === totalPages}
                              >
                                   Next
                              </Button>
                         </Flex>
                    )}
               </Box>
          </>
     );
};

export default FolderPages;
