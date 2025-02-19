
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Pencil, Trash2, ChevronLeft, Calendar, Users, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FileExplorer } from "@/components/drive/FileExplorer";
import { SharePanel } from "@/components/drive/SharePanel";
import { workspaces } from "@/mocks/workspaceData";
import { MembersList } from "@/components/members/MembersList";

const DriveDetail = () => {
  const { driveId } = useParams();
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [showSharePanel, setShowSharePanel] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [activeTab, setActiveTab] = useState("folders");

  // Find the drive from workspaces mock data
  const drive = workspaces.flatMap(workspace => 
    workspace.drives.filter(drive => drive.id === driveId)
  )[0];

  if (!drive) {
    return <div>Drive not found</div>;
  }

  // Mock members data
  const members = [
    { id: "1", name: "John Doe", email: "john@quantit.com", role: "editor", joinedAt: "2024-01-15" },
    { id: "2", name: "Jane Smith", email: "jane@quantit.com", role: "editor", joinedAt: "2024-02-01" },
    { id: "3", name: "Mike Johnson", email: "mike@quantit.com", role: "viewer", joinedAt: "2024-02-10" },
  ];

  const files = [
    { 
      id: 1, 
      name: "Documents", 
      type: "folder" as const, 
      modified: "2024-02-20", 
      shared: true,
      public: false
    },
    { 
      id: 2, 
      name: "Images", 
      type: "folder" as const, 
      modified: "2024-02-19", 
      shared: false,
      public: true
    },
    { 
      id: 3, 
      name: "Report.pdf", 
      type: "file" as const, 
      modified: "2024-02-18", 
      shared: true,
      public: false
    }
  ];

  const currentPath = [
    { id: "root", name: "My Drive" },
    { id: "folder1", name: "Projects" },
    { id: "folder2", name: "2024" }
  ];

  const canInviteMembers = drive.userRole === "editor";

  const handleFileSelect = (fileId: number) => {
    setSelectedFiles(prev => 
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleFolderOpen = (folderId: number) => {
    console.log("Opening folder:", folderId);
  };

  const handlePathNavigate = (pathId: string) => {
    console.log("Navigating to path:", pathId);
  };

  const handleShareClick = () => {
    setShowSharePanel(true);
  };

  const handleRoleChange = (memberId: string, newRole: string) => {
    console.log("Change role", { memberId, newRole });
  };

  const handleInviteMember = () => {
    console.log("Invite member:", inviteEmail);
    setInviteEmail("");
    setShowInviteDialog(false);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/drive">
          <Button variant="ghost" className="gap-2 mb-4">
            <ChevronLeft className="h-4 w-4" />
            Back to Drives
          </Button>
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{drive.name}</h1>
            <p className="text-gray-500 mt-1">{drive.description}</p>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Created: {drive.createdAt || "2024-02-20"}
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {members.length} members
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" className="gap-2 text-red-600 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="folders" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="folders">Folders</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="folders" className="mt-6">
          <FileExplorer 
            currentPath={currentPath}
            selectedFiles={selectedFiles}
            files={files}
            onPathNavigate={handlePathNavigate}
            onFileSelect={handleFileSelect}
            onFolderOpen={handleFolderOpen}
            onShareClick={handleShareClick}
          />
        </TabsContent>

        <TabsContent value="members" className="mt-6">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Drive Members</h2>
            <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
              <DialogTrigger asChild>
                <Button disabled={!canInviteMembers} className="gap-2">
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
          </div>
          <div className="space-y-4">
            {members.map(member => (
              <div 
                key={member.id} 
                className="flex items-center justify-between p-4 border rounded-lg bg-white"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    Joined {member.joinedAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <SharePanel 
        open={showSharePanel} 
        onOpenChange={setShowSharePanel} 
      />
    </div>
  );
};

export default DriveDetail;
