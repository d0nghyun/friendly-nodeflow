
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Grid, Users, HardDrive, Calendar, ChevronLeft } from "lucide-react";
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
import { OrganizationHeader } from "@/components/organization/OrganizationHeader";
import type { Organization, OrganizationMember } from "@/types/organization";
import { workspaces, drives } from "@/mocks/workspaceData";
import { MembersList } from "@/components/members/MembersList";

const OrganizationDetail = () => {
  const { organizationId } = useParams();
  const [activeTab, setActiveTab] = useState("members");

  const organization: Organization & { members: OrganizationMember[], drives: any[], workspaces: any[] } = {
    id: organizationId!,
    name: "Qore - Quantit",
    description: "Fintech Solutions Company",
    owner: {
      id: "user1",
      name: "John Doe",
      email: "john@qore.com",
      role: "owner",
      joinedAt: "2024-01-01"
    },
    membersCount: 15,
    createdAt: "2024-01-01",
    userRole: "owner",
    members: [
      {
        id: "user1",
        name: "John Doe",
        email: "john@qore.com",
        role: "owner",
        joinedAt: "2024-01-01"
      },
      {
        id: "user2",
        name: "Jane Smith",
        email: "jane@qore.com",
        role: "admin",
        joinedAt: "2024-01-15"
      },
      {
        id: "user3",
        name: "Mike Johnson",
        email: "mike@qore.com",
        role: "member",
        joinedAt: "2024-02-01"
      }
    ],
    workspaces: workspaces.map(ws => ({
      id: ws.id,
      name: ws.name,
      description: ws.description,
      membersCount: ws.members.length,
      createdAt: ws.createdAt
    })),
    drives: drives
  };

  const handleRoleChange = (memberId: string, newRole: string) => {
    console.log("Change role", { memberId, newRole });
  };

  const handleInviteMember = (email: string) => {
    console.log("Invite member:", email);
  };

  return (
    <div className="p-6">
      <Link to="/organizations">
        <Button variant="ghost" className="gap-2 mb-4">
          <ChevronLeft className="h-4 w-4" />
          Back to Organizations
        </Button>
      </Link>

      <OrganizationHeader organization={organization} />

      <Tabs defaultValue="members" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="members" className="gap-2">
            <Users className="h-4 w-4" />
            Members
          </TabsTrigger>
          <TabsTrigger value="workspaces" className="gap-2">
            <Grid className="h-4 w-4" />
            Workspaces
          </TabsTrigger>
          <TabsTrigger value="drives" className="gap-2">
            <HardDrive className="h-4 w-4" />
            Drives
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-6">
          <MembersList
            members={organization.members}
            userRole={organization.userRole}
            containerType="organization"
            onRoleChange={handleRoleChange}
            onInviteMember={handleInviteMember}
          />
        </TabsContent>

        <TabsContent value="workspaces" className="mt-6">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Workspaces</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Members</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {organization.workspaces.map((workspace) => (
                  <TableRow key={workspace.id}>
                    <TableCell className="font-medium">{workspace.name}</TableCell>
                    <TableCell>{workspace.description}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        {workspace.createdAt}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        {workspace.membersCount} members
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="drives" className="mt-6">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Drives</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Members</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {organization.drives.map((drive) => (
                  <TableRow key={drive.id}>
                    <TableCell className="font-medium">{drive.name}</TableCell>
                    <TableCell>{drive.description}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        {drive.createdAt}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        {drive.membersCount} members
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganizationDetail;
