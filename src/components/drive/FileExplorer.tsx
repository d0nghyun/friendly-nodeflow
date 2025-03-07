
import { Share, Trash2, Upload, FolderPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FilesList } from '@/components/drive/FilesList';
import { DriveBreadcrumb } from '@/components/drive/DriveBreadcrumb';
import type { FileItem } from '@/types/drive';

interface FileExplorerProps {
  currentPath: { id: string; name: string; }[];
  selectedFiles: number[];
  files: FileItem[];
  onPathNavigate: (pathId: string) => void;
  onFileSelect: (fileId: number) => void;
  onFolderOpen: (folderId: number) => void;
  onShareClick: () => void;
}

export const FileExplorer = ({
  currentPath,
  selectedFiles,
  files,
  onPathNavigate,
  onFileSelect,
  onFolderOpen,
  onShareClick,
}: FileExplorerProps) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <DriveBreadcrumb 
              paths={currentPath}
              onNavigate={onPathNavigate}
            />
          </div>
          <div className="flex items-center gap-2">
            <Input 
              placeholder="Search files..." 
              className="w-64"
            />
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => console.log("Upload file")}
            >
              <Upload className="h-4 w-4" />
              Upload
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => console.log("Create folder")}
            >
              <FolderPlus className="h-4 w-4" />
              Folder
            </Button>
            {selectedFiles.length > 0 && (
              <>
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={onShareClick}
                >
                  <Share className="h-4 w-4" />
                  Share
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-2 text-red-600 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <FilesList 
        files={files}
        selectedFiles={selectedFiles}
        onFileSelect={onFileSelect}
        onFolderOpen={onFolderOpen}
      />
    </div>
  );
};
