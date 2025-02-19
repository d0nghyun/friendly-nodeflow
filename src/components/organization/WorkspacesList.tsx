
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Workspace } from '@/types/organization';

interface WorkspacesListProps {
  workspaces: Workspace[];
  canCreate: boolean;
}

export const WorkspacesList = ({ workspaces, canCreate }: WorkspacesListProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Workspaces</h2>
          <p className="text-sm text-gray-500">Manage your organization's workspaces</p>
        </div>
        <Button disabled={!canCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          New Workspace
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workspaces.map((workspace) => (
          <Card key={workspace.id}>
            <CardHeader>
              <CardTitle>{workspace.name}</CardTitle>
              <CardDescription>{workspace.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="text-sm text-gray-500">
                  {workspace.members?.length || 0} members
                </div>
                <div className="text-sm text-gray-500">
                  {workspace.drives?.length || 0} drives
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
