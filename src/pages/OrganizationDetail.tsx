
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Grid, Users, HardDrive, UserPlus } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OrganizationHeader } from "@/components/organization/OrganizationHeader";
import type { Organization, OrganizationMember, OrganizationRole } from "@/types/organization";
import { workspaces } from "@/mocks/workspaceData";

const OrganizationDetail = () => {
  const { organizationId } = useParams();
  const [activeTab, setActiveTab] = useState("members");
  const [searchQuery, setSearchQuery] = useState("");
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

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
    workspaces: workspaces.map(ws => ({
      id: ws.id,
      name: ws.name,
      description: ws.description,
      membersCount: ws.members.length
    })),
    drives: allDrives
  };

  const isOwner = organization.userRole === "owner";
  const isAdmin = organization.userRole === "admin" || isOwner;

  const filteredMembers = organization.members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRoleChange = (memberId: string, newRole: OrganizationRole) => {
    console.log("Change role", { memberId, newRole });
    // Here you would typically make an API call to update the role
  };

  const handleInviteMember = () => {
    console.log("Invite member:", inviteEmail);
    setInviteEmail("");
    setShowInviteDialog(false);
    // Here you would typically make an API call to invite the member
  };

  return (
    <div className="p-6">
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
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Organization Members</h2>
              {isAdmin && (
                <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      Invite Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Invite Member</DialogTitle>
                      <DialogDescription>
                        Enter the email address of the person you want to invite.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <Input
                        placeholder="Email address"
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                      />
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleInviteMember}>
                          Send Invitation
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>
                      {member.role === "owner" ? (
                        <span className="capitalize">Owner</span>
                      ) : isAdmin ? (
                        <Select
                          value={member.role}
                          onValueChange={(value: OrganizationRole) => 
                            handleRoleChange(member.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className="capitalize">{member.role}</span>
                      )}
                    </TableCell>
                    <TableCell>{member.joinedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="workspaces" className="mt-6">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Workspaces</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Members</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {organization.workspaces.map((workspace) => (
                  <TableRow key={workspace.id}>
                    <TableCell className="font-medium">{workspace.name}</TableCell>
                    <TableCell>{workspace.description}</TableCell>
                    <TableCell>{workspace.membersCount} members</TableCell>
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
                  <TableHead>Owner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {organization.drives.map((drive) => (
                  <TableRow key={drive.id}>
                    <TableCell className="font-medium">{drive.name}</TableCell>
                    <TableCell>{drive.description}</TableCell>
                    <TableCell>{drive.owner}</TableCell>
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
