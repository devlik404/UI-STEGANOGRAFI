import Sidebar from "@/components/sidebar";
import { Box, Button, createListCollection, Flex, For, Heading, Icon, Input, Portal, Select, Table } from "@chakra-ui/react";
import { useState } from "react";

import { FiUpload, FiFileText, FiFilter } from "react-icons/fi";

const documents = [
     { name: "Free Textbooks as the New Advertising Medium.pdf", type: "Announcement", department: "Engineering", date: "6/14/16", icon: FiFileText },
     { name: "Employee Handbook.doc", type: "Form", department: "Company", date: "6/14/16", icon: FiFileText },
     { name: "Digital Media 2014.ppt", type: "Template", department: "Company", date: "6/13/16", icon: FiFileText },
     { name: "Brand Advertising Does Extreme.doc", type: "Contract", department: "Marketing", date: "6/13/16", icon: FiFileText },
     { name: "Advertising Shifting to the Web.xls", type: "Event", department: "Sales", date: "6/12/16", icon: FiFileText },
];
const items = [
     { id: 1, name: "Laptop", type: "Announcement", date: "6/14/16", icon: FiFileText },
     { id: 2, name: "Coffee Maker", type: "Form", date: "6/14/16", icon: FiFileText },
     { id: 3, name: "Desk Chair", type: "Pdf", date: "6/14/16", icon: FiFileText },
     { id: 4, name: "Smartphone", type: "Word", date: "6/14/16", icon: FiFileText },
     { id: 5, name: "Headphones", type: "Excel", date: "6/14/16", icon: FiFileText },
]

export default function DocumentDirectory() {
     const [search, setSearch] = useState("");
     const [filterType, setFilterType] = useState("All");
     const [filterDepartment, setFilterDepartment] = useState("All");
     const frameworks = createListCollection({
          items: [
               { label: "React.js", value: "react" },
               { label: "Vue.js", value: "vue" },
               { label: "Angular", value: "angular" },
               { label: "Svelte", value: "svelte" },
          ],
     })

     return (

          <>
               <Sidebar />
               <Box p={6} ml={{ base: 0, md: "240px" }}  >
                    <Flex justifyContent="space-between" mb={4}>
                         <Heading size="lg">Document Directory</Heading>
                   
                    </Flex>
                    <Flex gap={4} mb={4}>
                         <Input placeholder="Search documents..." value={search} onChange={(e) => setSearch(e.target.value)} />
                         <Select.Root collection={frameworks} size="sm" width="320px">
                              <Select.HiddenSelect />
                              <Select.Label>Select framework</Select.Label>
                              <Select.Control>
                                   <Select.Trigger>
                                        <Select.ValueText placeholder="Select framework" />
                                   </Select.Trigger>
                                   <Select.IndicatorGroup>
                                        <Select.Indicator />
                                   </Select.IndicatorGroup>
                              </Select.Control>
                              <Portal>
                                   <Select.Positioner>
                                        <Select.Content>
                                             {frameworks.items.map((framework) => (
                                                  <Select.Item item={framework} key={framework.value}>
                                                       {framework.label}
                                                       <Select.ItemIndicator />
                                                  </Select.Item>
                                             ))}
                                        </Select.Content>
                                   </Select.Positioner>
                              </Portal>
                         </Select.Root>
                         <Button colorScheme="gray">
                              Filter
                         </Button>
                    </Flex>

                    <Table.Root size="sm" variant={"outline"}>
                         <Table.Header>
                              <Table.Row>
                                   <Table.ColumnHeader>Name</Table.ColumnHeader>
                                   <Table.ColumnHeader>Type</Table.ColumnHeader>
                                   <Table.ColumnHeader>Date</Table.ColumnHeader>
                                   <Table.ColumnHeader textAlign="end">File</Table.ColumnHeader>
                              </Table.Row>
                         </Table.Header>
                         <Table.Body>
                              {items.map((item) => (
                                   <Table.Row key={item.id}>
                                        <Table.Cell>{item.name}</Table.Cell>
                                        <Table.Cell>{item.type}</Table.Cell>
                                        <Table.Cell>{item.date}</Table.Cell>
                                        <Table.Cell textAlign="end">
                                             <Icon as={item.icon} boxSize={6} color="teal.500" />

                                        </Table.Cell>
                                   </Table.Row>
                              ))}
                         </Table.Body>
                    </Table.Root>

               </Box>
          </>

     );
}


