
import { File, Folder, Globe, MoreHorizontal, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { FileItem } from "@/types/drive";

interface FilesListProps {
  files: FileItem[];
  selectedFiles: number[];
  onFileSelect: (fileId: number) => void;
  onFolderOpen?: (fileId: number) => void;
}

export const FilesList = ({ 
  files, 
  selectedFiles, 
  onFileSelect,
  onFolderOpen 
}: FilesListProps) => {
  return (
    <div className="flex-1 p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox 
                checked={selectedFiles.length === files.length}
                onCheckedChange={(checked) => {
                  files.forEach(file => onFileSelect(file.id));
                }}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Modified</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell>
                <Checkbox 
                  checked={selectedFiles.includes(file.id)}
                  onCheckedChange={() => onFileSelect(file.id)}
                />
              </TableCell>
              <TableCell>
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => file.type === 'folder' && onFolderOpen?.(file.id)}
                >
                  {file.type === 'folder' ? (
                    <Folder className="h-4 w-4 text-gray-400" />
                  ) : (
                    <File className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="font-medium">{file.name}</span>
                  {file.shared && (
                    <Users className="h-4 w-4 text-gray-400" />
                  )}
                  {file.public && (
                    <Globe className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </TableCell>
              <TableCell>{file.modified}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
