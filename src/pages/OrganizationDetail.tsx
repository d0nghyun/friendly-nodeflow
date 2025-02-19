
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Grid, Users, HardDrive } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrganizationHeader } from "@/components/organization/OrganizationHeader";
import { MembersList } from "@/components/organization/MembersList";
import { WorkspacesList } from "@/components/organization/WorkspacesList";
import { DrivesList } from "@/components/organization/DrivesList";
import type { Organization, OrganizationMember } from "@/types/organization";
import { workspaces } from "@/mocks/workspaceData";

const OrganizationDetail = () => {
  const { organizationId } = useParams();
  const [activeTab, setActiveTab] = useState("workspaces");
  const [searchQuery, setSearchQuery] = useState("");

  // 워크스페이스의 모든 드라이브를 하나의 배열로 통합
  const allDrives = workspaces.reduce((acc, workspace) => {
    return [...acc, ...workspace.drives];
  }, [] as typeof workspaces[0]['drives']);

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
    // workspaces 데이터를 중앙화된 데이터로 변경
    workspaces: workspaces.map(ws => ({
      id: ws.id,
      name: ws.name,
      description: ws.description,
      membersCount: ws.members.length
    })),
    // drives 데이터를 중앙화된 데이터로 변경
    drives: allDrives
  };

  const isOwner = organization.userRole === "owner";
  const isAdmin = organization.userRole === "admin" || isOwner;

  const filteredMembers = organization.members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <OrganizationHeader organization={organization} />

      <Tabs defaultValue="workspaces" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="workspaces" className="gap-2">
            <Grid className="h-4 w-4" />
            Workspace
          </TabsTrigger>
          <TabsTrigger value="drives" className="gap-2">
            <HardDrive className="h-4 w-4" />
            Drive
          </TabsTrigger>
          <TabsTrigger value="members" className="gap-2">
            <Users className="h-4 w-4" />
            Members
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-6">
          <MembersList 
            members={filteredMembers}
            isAdmin={isAdmin}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </TabsContent>

        <TabsContent value="workspaces" className="mt-6">
          <WorkspacesList workspaces={organization.workspaces} />
        </TabsContent>

        <TabsContent value="drives" className="mt-6">
          <DrivesList drives={organization.drives} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganizationDetail;
