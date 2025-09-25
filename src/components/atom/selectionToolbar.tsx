import { handleDeleted } from "@/hooks/deletedFiles";
import { Box, Text, Flex, IconButton } from "@chakra-ui/react";
import { FaTrash, FaShareAlt, FaDownload } from "react-icons/fa";
import { toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

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

  // === HANDLE DOWNLOAD FILE ===

  const handleDownload = () => {

    for (const file of selected) {
      if (file.image) {
        window.electron.downloadFile(file.image);
      }
    }
  };

  useEffect(() => {
    const removeDone = window.electron.onDownloadDone((path) => {
      toaster.success({
        title: "Success",
        description: "File saved successfully: " + path,
      });
        onClearSelection(); 
    });

    const removeFailed = window.electron.onDownloadFailed((err) => {
      toaster.error({
        title: "Failed",
        description: "Download failed: " + err,
      });
        onClearSelection(); 
    });

    return () => {
      removeDone();
      removeFailed();
    };
  }, [onClearSelection]);


  const handleDelete = async () => {
  try {
    for (const file of selected) {
      await handleDeleted(file.id);
    }

    if (onRefresh) {
      onRefresh();
    }
    toaster.success({
      title: "Deleted successful",
      description: "File(s) deleted successfully on server",
    });
    onClearSelection();
  } catch (err) {
    console.error(err);
    toaster.error({
      title: "Delete failed",
      description: "Unable to delete file(s).",
    });
  }
};
const handleShare = async () => {
  if (!selected || selected.length === 0) return;

  try {
    // Ambil semua url file yang dipilih
    const links = selected.map((file) => file.image).filter(Boolean);

    if (links.length === 0) {
      toaster.error({
        title: "No link",
        description: "File(s) have no shareable link.",
      });
      return;
    }

    // Gabung link jadi teks
    const shareText = links.join("\n");

    // Copy ke clipboard
    await navigator.clipboard.writeText(shareText);

    toaster.success({
      title: "Link copied",
      description: "File link(s) copied to clipboard.",
    });

    onClearSelection(); // ✅ clear setelah share
  } catch (err) {
    console.error(err);
    toaster.error({
      title: "Share failed",
      description: "Could not copy link(s).",
    });
    onClearSelection();
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
          <IconButton
  aria-label="Share"
  bg={"transparent"}
  onClick={handleShare}
>
  <FaShareAlt />
</IconButton>

          <IconButton
            aria-label="Download"
            bg={"transparent"}
            onClick={handleDownload}
          >
            <FaDownload />
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
};
