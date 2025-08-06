// components/atom/selectionToolbar.tsx

import { Box, Text, Flex, IconButton } from "@chakra-ui/react";
import {
  FaTrash,
  FaEdit,
  FaShareAlt,
  FaDownload
} from "react-icons/fa";

interface SelectionToolbarProps {
  selectedNames: string[];
  onClearSelection: () => void;
}

export const SelectionToolbar = ({
  selectedNames,
  onClearSelection,
}: SelectionToolbarProps) => {
  if (selectedNames.length === 0) return null;

  return (
    <Box
      top={0}
      width="100%"
      bg="#3A86FF"
      color="white"
      px={4}
      zIndex={10}
    >
      <Flex align="center" justify="space-between">
        <Text fontWeight="semibold" >
           '{selectedNames[0]}' is selected.
        </Text>
        <Flex gap={2} >
          <IconButton aria-label="Delete" bg={"transparent"} >
           <FaTrash />
          </IconButton>
            {/* <IconButton aria-label="Edit" bg={"transparent"}>
           < FaEdit/>
          </IconButton> */}
            <IconButton aria-label="Share" bg={"transparent"}>
           <FaShareAlt />
          </IconButton>
            <IconButton aria-label="Download" bg={"transparent"}>
           <FaDownload />
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
};
