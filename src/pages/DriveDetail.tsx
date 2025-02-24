import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileExplorer } from "@/components/drive/FileExplorer";
import { SharePanel } from "@/components/drive/SharePanel";
import { DriveHeader } from "@/components/drive/DriveHeader";
import { DriveMembers } from "@/components/drive/DriveMembers";
import { drives } from "@/mocks/workspaceData";
import type { FileItem, Member } from "@/types/drive";

const DriveDetail = () => {
  const { driveId } = useParams();
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [showSharePanel, setShowSharePanel] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [activeTab, setActiveTab] = useState("folders");
  const [currentFolderId, setCurrentFolderId] = useState("root");

  const drive = drives.find(drive => drive.id === driveId);

  if (!drive) {
    return <div>Drive not found</div>;
  }

  const members: Member[] = [
    { id: "1", name: "John Doe", email: "john@quantit.com", role: "editor", joinedAt: "2024-01-15" },
    { id: "2", name: "Jane Smith", email: "jane@quantit.com", role: "editor", joinedAt: "2024-02-01" },
    { id: "3", name: "Mike Johnson", email: "mike@quantit.com", role: "viewer", joinedAt: "2024-02-10" },
  ];

  const folderStructure: Record<string, FileItem[]> = {
    root: [
      { id: 1, name: "Content Model", type: "folder", modified: "2024-02-20", shared: false, public: false },
      { id: 2, name: "Alpha Model", type: "folder", modified: "2024-02-20", shared: false, public: false },
      { id: 3, name: "Raw", type: "folder", modified: "2024-02-20", shared: false, public: false },
    ],
    1: [ // Content Model
      { id: 11, name: "cm1", type: "folder", modified: "2024-02-20", shared: false, public: false },
      { id: 12, name: "cm2", type: "folder", modified: "2024-02-20", shared: false, public: false },
    ],
    2: [ // Alpha Model
      { id: 21, name: "us", type: "folder", modified: "2024-02-20", shared: false, public: false },
      { id: 22, name: "kr", type: "folder", modified: "2024-02-20", shared: false, public: false },
    ],
    21: [ // us
      { id: 211, name: "am1", type: "folder", modified: "2024-02-20", shared: false, public: false },
    ],
    22: [ // kr
      { id: 221, name: "am1", type: "folder", modified: "2024-02-20", shared: false, public: false },
    ],
    3: [ // Raw
      { id: 31, name: "sample.csv", type: "file", modified: "2024-02-20", shared: false, public: false },
      { id: 32, name: "bareksa", type: "folder", modified: "2024-02-20", shared: false, public: false },
    ],
    32: [ // bareksa
      { id: 321, name: "nav", type: "file", modified: "2024-02-20", shared: false, public: false },
    ],
  };

  const findPath = (targetId: string, path: { id: string; name: string; }[] = []): { id: string; name: string; }[] | null => {
    if (targetId === 'root') {
      return [{ id: 'root', name: drive.name }];
    }

    for (const [folderId, items] of Object.entries(folderStructure)) {
      const item = items.find(item => item.id.toString() === targetId);
      if (item) {
        const parentPath = findPath(folderId);
        if (parentPath) {
          return [...parentPath, { id: targetId, name: item.name }];
        }
      }
    }
    return null;
  };

  const currentPath = findPath(currentFolderId) || [{ id: 'root', name: drive.name }];
  const files = folderStructure[currentFolderId] || [];

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
    setCurrentFolderId(folderId.toString());
    setSelectedFiles([]);
  };

  const handlePathNavigate = (pathId: string) => {
    setCurrentFolderId(pathId);
    setSelectedFiles([]);
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
