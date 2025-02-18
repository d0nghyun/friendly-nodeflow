
import { Link } from "react-router-dom";
import { FolderOpen, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Drive {
  id: string;
  name: string;
  description: string;
  owner: string;
}

interface DrivesListProps {
  drives: Drive[];
}

export const DrivesList = ({ drives }: DrivesListProps) => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Organization Drives</h2>
        <Button className="gap-2">
          <FolderOpen className="h-4 w-4" />
          New Drive
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drives.map((drive) => (
            <TableRow key={drive.id}>
              <TableCell>
                <Link to={`/drive/${drive.id}`} className="flex items-center gap-2 hover:text-blue-600">
                  <FolderOpen className="h-4 w-4" />
                  {drive.name}
                </Link>
              </TableCell>
              <TableCell>{drive.description}</TableCell>
              <TableCell>{drive.owner}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
