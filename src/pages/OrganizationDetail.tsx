import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { 
  ChevronLeft, 
  Pencil, 
  Trash2, 
  Users, 
  Grid, 
  FolderOpen,
  UserPlus,
  Search,
  HardDrive
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Organization, OrganizationMember } from "@/types/organization";

const OrganizationDetail = () => {
  const { organizationId } = useParams();
  const [activeTab, setActiveTab] = useState("workspaces");
  const [searchQuery, setSearchQuery] = useState("");

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
    workspaces: [
      {
        id: "ws1",
        name: "Main Workspace",
        description: "Core business processes",
        membersCount: 8
      },
      {
        id: "ws2",
        name: "Marketing",
        description: "Marketing campaigns and automation",
        membersCount: 5
      }
    ],
    drives: [
      {
        id: "drive1",
        name: "Company Documents",
        description: "Shared company resources",
        owner: "John Doe"
      },
      {
        id: "drive2",
        name: "Marketing Assets",
        description: "Brand assets and materials",
        owner: "Jane Smith"
      }
    ]
  };

  const isOwner = organization.userRole === "owner";
  const isAdmin = organization.userRole === "admin" || isOwner;

  const filteredMembers = organization.members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" className="gap-2 mb-4">
            <ChevronLeft className="h-4 w-4" />
            Back to Organizations
          </Button>
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{organization.name}</h1>
            <p className="text-gray-500 mt-1">{organization.description}</p>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <span>Owner: {organization.owner.name}</span>
              <span>Created: {organization.createdAt}</span>
              <span>{organization.membersCount} members</span>
            </div>
          </div>
          <div className="flex gap-2">
            {isAdmin && (
              <Button variant="outline" className="gap-2">
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            )}
            {isOwner && (
              <Button variant="outline" className="gap-2 text-red-600 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
                Delete Organization
              </Button>
            )}
          </div>
        </div>
      </div>

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
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4 flex-1">
              <h2 className="text-lg font-semibold">Organization Members</h2>
              <div className="max-w-sm flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search members..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {isAdmin && (
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Invite Member
              </Button>
            )}
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    {isAdmin && member.role !== "owner" ? (
                      <Select defaultValue={member.role}>
                        <SelectTrigger className="w-[120px]">
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
                  <TableCell>
                    {isAdmin && member.role !== "owner" && (
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-600">
                        Remove
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="workspaces" className="mt-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold">Workspaces</h2>
            <Button className="gap-2">
              <Grid className="h-4 w-4" />
              New Workspace
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organization.workspaces.map((workspace) => (
              <Link key={workspace.id} to={`/workspace/${workspace.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Grid className="h-5 w-5 text-gray-500" />
                      {workspace.name}
                    </CardTitle>
                    <CardDescription>{workspace.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      {workspace.membersCount} members
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drives" className="mt-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold">Organization Drives</h2>
            <Button className="gap-2">
              <FolderOpen className="h-4 w-4" />
              New Drive
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organization.drives.map((drive) => (
              <Card key={drive.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-gray-500" />
                    {drive.name}
                  </CardTitle>
                  <CardDescription>{drive.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500">
                    Owner: {drive.owner}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganizationDetail;
