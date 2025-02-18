
import { useState } from 'react';
import { HardDrive, Share, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DriveCard } from '@/components/drive/DriveCard';
import { ExplorerHeader } from '@/components/drive/ExplorerHeader';
import { FilesList } from '@/components/drive/FilesList';
import { DriveBreadcrumb } from '@/components/drive/DriveBreadcrumb';
import { SharePanel } from '@/components/drive/SharePanel';

const Drive = () => {
  const [selectedDrive, setSelectedDrive] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<{ id: string; name: string; }[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [showSharePanel, setShowSharePanel] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  // 드라이브 목록
  const drives = [
    {
      id: "drive1",
      name: "Company Documents",
      description: "Shared company resources",
      owner: "John Doe",
      membersCount: 15
    },
    {
      id: "drive2",
      name: "Marketing Assets",
      description: "Brand assets and materials",
      owner: "Jane Smith",
      membersCount: 8
    }
  ];

  // 파일 목록
  const files = [
    { 
      id: 1, 
      name: 'Project Plan.pdf', 
      type: 'file' as const,
      modified: '2024-02-20',
      owner: 'John Doe',
      shared: true,
      public: true
    },
    { 
      id: 2, 
      name: 'Assets', 
      type: 'folder' as const,
      modified: '2024-02-19',
      owner: 'Jane Smith',
      shared: true,
      public: false
    },
    { 
      id: 3, 
      name: 'Documentation', 
      type: 'folder' as const,
      modified: '2024-02-18',
      owner: 'Mike Johnson',
      shared: false,
      public: false
    },
  ];

  // 멤버 목록
  const members = [
    {
      id: "user1",
      name: "John Doe",
      email: "john@example.com",
      role: "editor" as const
    },
    {
      id: "user2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "viewer" as const
    }
  ];

  const handleFileSelect = (fileId: number) => {
    setSelectedFiles(prev => {
      if (prev.includes(fileId)) {
        return prev.filter(id => id !== fileId);
      }
      return [...prev, fileId];
    });
  };

  const handleFolderOpen = (folderId: number) => {
    const folder = files.find(f => f.id === folderId);
    if (folder) {
      setCurrentPath(prev => [...prev, { id: folderId.toString(), name: folder.name }]);
    }
  };

  const handlePathNavigate = (pathId: string) => {
    const pathIndex = currentPath.findIndex(p => p.id === pathId);
    setCurrentPath(prev => prev.slice(0, pathIndex + 1));
  };

  if (!selectedDrive) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Drives</h1>
            <p className="text-gray-500">Access your organization's shared drives</p>
          </div>
          <Button className="gap-2">
            <HardDrive className="h-4 w-4" />
            New Drive
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drives.map((drive) => (
            <DriveCard 
              key={drive.id}
              drive={drive}
              onClick={(id) => {
                setSelectedDrive(id);
                setCurrentPath([{ id, name: drive.name }]);
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex">
      <div className="flex-1 flex flex-col">
        <div className="border-b bg-white p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <DriveBreadcrumb 
                paths={currentPath}
                onNavigate={handlePathNavigate}
              />
            </div>
            <div className="flex items-center gap-2">
              <Input 
                placeholder="Search files..." 
                className="w-64"
              />
              {selectedFiles.length > 0 ? (
                <>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => setShowSharePanel(true)}
                  >
                    <Share className="h-4 w-4" />
                    Share
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2 text-red-600 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => setShowSharePanel(true)}
                >
                  <Share className="h-4 w-4" />
                  Share
                </Button>
              )}
            </div>
          </div>
        </div>

        <FilesList 
          files={files}
          selectedFiles={selectedFiles}
          onFileSelect={handleFileSelect}
          onFolderOpen={handleFolderOpen}
        />
      </div>

      {showSharePanel && (
        <SharePanel 
          members={members}
          isPublic={isPublic}
          onClose={() => setShowSharePanel(false)}
          onRoleChange={(memberId, role) => {
            console.log('Role changed:', memberId, role);
          }}
          onPublicChange={setIsPublic}
        />
      )}
    </div>
  );
};

export default Drive;
