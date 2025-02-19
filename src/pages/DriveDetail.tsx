
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FileExplorer } from "@/components/drive/FileExplorer";
import { SharePanel } from "@/components/drive/SharePanel";

const DriveDetail = () => {
  const { driveId } = useParams();
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [showSharePanel, setShowSharePanel] = useState(false);

  const files = [
    { 
      id: 1, 
      name: "Documents", 
      type: "folder" as const, 
      modified: "2024-02-20", 
      owner: "John Doe",
      shared: true,
      public: false
    },
    { 
      id: 2, 
      name: "Images", 
      type: "folder" as const, 
      modified: "2024-02-19", 
      owner: "John Doe",
      shared: false,
      public: true
    },
    { 
      id: 3, 
      name: "Report.pdf", 
      type: "file" as const, 
      modified: "2024-02-18", 
      owner: "Jane Smith",
      shared: true,
      public: false
    }
  ];

  const currentPath = [
    { id: "root", name: "My Drive" },
    { id: "folder1", name: "Projects" },
    { id: "folder2", name: "2024" }
  ];

  const handleFileSelect = (fileId: number) => {
    setSelectedFiles(prev => 
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleFolderOpen = (folderId: number) => {
    console.log("Opening folder:", folderId);
  };

  const handlePathNavigate = (pathId: string) => {
    console.log("Navigating to path:", pathId);
  };

  const handleShareClick = () => {
    setShowSharePanel(true);
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <FileExplorer 
        currentPath={currentPath}
        selectedFiles={selectedFiles}
        files={files}
        onPathNavigate={handlePathNavigate}
        onFileSelect={handleFileSelect}
        onFolderOpen={handleFolderOpen}
        onShareClick={handleShareClick}
      />
      <SharePanel 
        open={showSharePanel} 
        onOpenChange={setShowSharePanel} 
      />
    </div>
  );
};

export default DriveDetail;
