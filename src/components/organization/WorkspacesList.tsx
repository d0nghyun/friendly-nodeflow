
import { Link } from "react-router-dom";
import { Grid, Users, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Workspace {
  id: string;
  name: string;
  description: string;
  membersCount: number;
}

interface WorkspacesListProps {
  workspaces: Workspace[];
}

export const WorkspacesList = ({ workspaces }: WorkspacesListProps) => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Workspaces</h2>
        <Button className="gap-2">
          <Grid className="h-4 w-4" />
          New Workspace
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Members</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workspaces.map((workspace) => (
            <TableRow key={workspace.id}>
              <TableCell>
                <Link to={`/workspace/${workspace.id}`} className="flex items-center gap-2 hover:text-blue-600">
                  <Grid className="h-4 w-4" />
                  {workspace.name}
                </Link>
              </TableCell>
              <TableCell>{workspace.description}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {workspace.membersCount}
                </div>
              </TableCell>
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
