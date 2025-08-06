import Sidebar from "@/components/sidebar";
import {
     Box,
     Text,
     Image,
     Table,
     Flex,
     Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectionToolbar } from "@/components/atom/selectionToolbar";

const assets = [
     {
          id: 1,
          name: "spx4dk5fku9m2ozsoo...",
          size: "33.07 KB",
          originalName: "test1",
          uploadDate: "2025-06-13 16:06:00.423694",
          image: "https://res.cloudinary.com/dmqsfpgqj/image/upload/v1749805557/vmj03sciehvkwhdsft1z.png"
     },
     {
          id: 2,
          name: "yl0jbdd0rlzsyagp4i54",
          size: "58.58 KB",
          originalName: "tes2",
          uploadDate: "2025-06-13 16:06:00.423694",
          image: "https://res.cloudinary.com/dmqsfpgqj/image/upload/v1752740314/stegano_images/yl0jbdd0rlzsyagp4i54.png"
     },
     {
          id: 3,
          name: "hncbohq5kanfu768jj11",
          size: "33.07 KB",
          originalName: "test4",
          uploadDate: "2025-06-13 16:06:00.423694",
          image: "https://res.cloudinary.com/dmqsfpgqj/image/upload/v1749807201/stegano_images/hncbohq5kanfu768jj11.png"
     },
     {
          id: 3,
          name: "hncbohq5kanfu768jj11",
          size: "33.07 KB",
          originalName: "test33",
          uploadDate: "2025-06-13 16:06:00.423694",
          image: "https://res.cloudinary.com/dmqsfpgqj/image/upload/v1749807201/stegano_images/hncbohq5kanfu768jj11.png"
     },
];

const FolderPages = () => {
     const [selection, setSelection] = useState<number[]>([]);
     const indeterminate = selection.length > 0 && selection.length < assets.length;
     const selectedAssets = assets.filter((a) => selection.includes(a.id));
     const selectedNames = selectedAssets.map((a) => a.name);

     return (
          <>
               <Sidebar />
               {selectedNames.length > 0 && (
                    <Box ml={{ base: 0, md: "240px" }} p={"1"} >
                         <SelectionToolbar
                              selectedNames={selectedNames}
                              onClearSelection={() => setSelection([])}
                         />
                    </Box>
               )}

               <Box ml={{ base: 0, md: "240px" }} p={6}>
   {/* Header */}
                    <Flex justifyContent="space-between" mb="8">
                         <Box>
                              <Heading size="lg" mb="2">Asseets Page</Heading>
                         </Box>

                    </Flex>
                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                         Showing {assets.length} assets
                    </Text>

                    <Table.Root
                         variant={"outline"}
                         colorPalette={"blue"}
                    >
                         <Table.Header>
                              <Table.Row>
                                   <Table.ColumnHeader>
                                        <Checkbox
                                             checked={indeterminate ? "indeterminate" : selection.length === assets.length}
                                             onCheckedChange={(e) =>
                                                  setSelection(
                                                       e.checked ? assets.map((a) => a.id) : []
                                                  )
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
                              {assets.map((asset) => (
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
                                                            e.checked
                                                                 ? [...prev, asset.id]
                                                                 : prev.filter((id) => id !== asset.id)
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
               </Box>
          </>
     );
};

export default FolderPages;
