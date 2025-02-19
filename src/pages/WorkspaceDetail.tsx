import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { 
  ChevronLeft, 
  Pencil, 
  Trash2, 
  Grid,
  Users,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getWorkspaceById } from "@/mocks/workspaceData";
import { MembersList } from "@/components/members/MembersList";

const WorkspaceDetail = () => {
  const { workspaceId } = useParams();
  const [activeTab, setActiveTab] = useState("workflows");

  const workspace = getWorkspaceById(workspaceId || "");
  
  if (!workspace) {
    return <div>Workspace not found</div>;
  }

  const isAdmin = workspace.userRole === "admin";
  const isMember = workspace.userRole === "member";
  const canModify = isAdmin || isMember;

  const handleRoleChange = (memberId: string, newRole: string) => {
    console.log("Change role", { memberId, newRole });
  };

  const handleInviteMember = (email: string) => {
    console.log("Invite member:", email);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/workspaces">
          <Button variant="ghost" className="gap-2 mb-4">
            <ChevronLeft className="h-4 w-4" />
            Back to Workspaces
          </Button>
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{workspace.name}</h1>
            <p className="text-gray-500 mt-1">{workspace.description}</p>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Created: {workspace.createdAt}
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {workspace.members.length} members
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            {isAdmin && (
              <Button variant="outline" className="gap-2 text-red-600 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="workflows" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="workflows" className="gap-2">
            <Grid className="h-4 w-4" />
            Workflow
          </TabsTrigger>
          <TabsTrigger value="members" className="gap-2">
            <Users className="h-4 w-4" />
            Members
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-6">
          <MembersList
            members={workspace.members}
            userRole={workspace.userRole}
            containerType="workspace"
            onRoleChange={handleRoleChange}
            onInviteMember={handleInviteMember}
          />
        </TabsContent>

        <TabsContent value="workflows" className="mt-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold">Workflows</h2>
            <Button disabled={!canModify} className="gap-2">
              <Grid className="h-4 w-4" />
              New Workflow
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspace.workflows.map((workflow) => (
              <Link key={workflow.id} to={`/${workspace.id}/${workflow.id}`}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="text-gray-500"
                      >
                        <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"/>
                        <path d="M12 16v-4"/>
                        <path d="M12 8h.01"/>
                      </svg>
                      {workflow.name}
                    </CardTitle>
                    <CardDescription>{workflow.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkspaceDetail;
