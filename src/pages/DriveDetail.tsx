
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileExplorer } from "@/components/drive/FileExplorer";
import { SharePanel } from "@/components/drive/SharePanel";
import { DriveHeader } from "@/components/drive/DriveHeader";
import { DriveMembers } from "@/components/drive/DriveMembers";
import { workspaces } from "@/mocks/workspaceData";
import type { FileItem } from "@/types/drive";

const DriveDetail = () => {
  const { driveId } = useParams();
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [showSharePanel, setShowSharePanel] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [activeTab, setActiveTab] = useState("folders");

  const drive = workspaces.flatMap(workspace => 
    workspace.drives.filter(drive => drive.id === driveId)
  )[0];

  if (!drive) {
    return <div>Drive not found</div>;
  }

  const members = [
    { id: "1", name: "John Doe", email: "john@quantit.com", role: "editor", joinedAt: "2024-01-15" },
    { id: "2", name: "Jane Smith", email: "jane@quantit.com", role: "editor", joinedAt: "2024-02-01" },
    { id: "3", name: "Mike Johnson", email: "mike@quantit.com", role: "viewer", joinedAt: "2024-02-10" },
  ];

  const files: FileItem[] = [
    { 
      id: 1, 
      name: "Documents", 
      type: "folder", 
      modified: "2024-02-20", 
      shared: true,
      public: false
    },
    { 
      id: 2, 
      name: "Images", 
      type: "folder", 
      modified: "2024-02-19", 
      shared: false,
      public: true
    },
    { 
      id: 3, 
      name: "Report.pdf", 
      type: "file", 
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
  const canManageRoles = drive.userRole === "editor";

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
      <DriveHeader drive={drive} membersCount={members.length} />

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
          <DriveMembers 
            members={members}
            canInviteMembers={canInviteMembers}
            canManageRoles={canManageRoles}
            showInviteDialog={showInviteDialog}
            inviteEmail={inviteEmail}
            onInviteEmailChange={setInviteEmail}
            onShowInviteDialogChange={setShowInviteDialog}
            onInviteMember={handleInviteMember}
            onRoleChange={handleRoleChange}
          />
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
