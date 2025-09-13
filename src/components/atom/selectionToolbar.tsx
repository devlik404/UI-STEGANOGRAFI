import { handleDeleted } from "@/hooks/deletedFiles";
import { Box, Text, Flex, IconButton } from "@chakra-ui/react";
import { FaTrash, FaShareAlt, FaDownload } from "react-icons/fa";
import { toaster } from "@/components/ui/toaster"

interface SelectionToolbarProps {
  selected: any[]; 
  onClearSelection: () => void;
   onRefresh?: () => void; 
}

export const SelectionToolbar = ({
  selected,
  onClearSelection,
  onRefresh,
}: SelectionToolbarProps) => {
  if (selected.length === 0) return null;

  const handleDelete = async () => {
    try {
   
      const ids = selected.map((a) => a.id);
      await handleDeleted(Number(ids));
      if (onRefresh) {
       onRefresh();
        toaster.success({
          title: "Deleted successful",
          description: "File deleted successfully to the server",
        })
    } else {
      onClearSelection();
    }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      top={0}
      width="100%"
      bg="#3A86FF"
      color="white"
      px={4}
      py={2}
      zIndex={10}
      position="sticky"
    >
      <Flex align="center" justify="space-between">
        <Text fontWeight="semibold">
          {selected.length} item{selected.length > 1 ? "s" : ""} selected
        </Text>
        <Flex gap={2}>
          <IconButton
            aria-label="Delete"
            bg={"transparent"}
            onClick={handleDelete}
          >
            <FaTrash />
          </IconButton>
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
