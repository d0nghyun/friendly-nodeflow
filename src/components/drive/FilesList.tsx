
import { File, Folder, Globe, MoreHorizontal, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FileItem {
  id: number;
  name: string;
  type: 'file' | 'folder';
  modified: string;
  owner: string;
  shared: boolean;
  public: boolean;
}

interface FilesListProps {
  files: FileItem[];
}

export const FilesList = ({ files }: FilesListProps) => {
  return (
    <div className="flex-1 p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Modified</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell>
                <div className="flex items-center gap-2">
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
              <TableCell>{file.owner}</TableCell>
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
