import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Pencil, Trash2, ChevronLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileExplorer } from "@/components/drive/FileExplorer";
import { SharePanel } from "@/components/drive/SharePanel";
import { workspaces } from "@/mocks/workspaceData";
import { MembersList } from "@/components/members/MembersList";

const DriveDetail = () => {
  const { driveId } = useParams();
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [showSharePanel, setShowSharePanel] = useState(false);
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
      owner: "John Doe",
      shared: true,
      public: false
    },
    { 
      id: 2, 
      name: "Images", 
      type: "folder" as const, 
      modified: "2024-02-19", 
      owner: "John Doe",
      shared: false,
      public: true
    },
    { 
      id: 3, 
      name: "Report.pdf", 
      type: "file" as const, 
      modified: "2024-02-18", 
      owner: "Jane Smith",
      shared: true,
      public: false
    }
  ];

  const currentPath = [
    { id: "root", name: "My Drive" },
    { id: "folder1", name: "Projects" },
    { id: "folder2", name: "2024" }
  ];

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
    // Here you would typically make an API call to update the role
  };

  const handleInviteMember = (email: string) => {
    console.log("Invite member:", email);
    // Here you would typically make an API call to invite the member
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
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Owner: {drive.owner}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Created: 2024-02-20
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
          <MembersList
            members={members}
            userRole={drive.userRole}
            containerType="drive"
            onRoleChange={handleRoleChange}
            onInviteMember={handleInviteMember}
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
