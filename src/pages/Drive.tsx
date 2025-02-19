import { useState } from 'react';
import { HardDrive, Share, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DriveCard } from '@/components/drive/DriveCard';
import { ExplorerHeader } from '@/components/drive/ExplorerHeader';
import { FilesList } from '@/components/drive/FilesList';
import { DriveBreadcrumb } from '@/components/drive/DriveBreadcrumb';
import { SharePanel } from '@/components/drive/SharePanel';
import { workspaces } from '@/mocks/workspaceData';

const Drive = () => {
  const [selectedDrive, setSelectedDrive] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<{ id: string; name: string; }[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [showSharePanel, setShowSharePanel] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  // 워크스페이스의 모든 드라이브를 하나의 배열로 통합
  const drives = workspaces.reduce((acc, workspace) => {
    return [...acc, ...workspace.drives.map(drive => ({
      ...drive,
      membersCount: workspace.members.length
    }))];
  }, [] as Array<typeof workspaces[0]['drives'][0] & { membersCount: number }>);

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

  // 멤버 목록 - 현재 선택된 드라이브의 워크스페이스 멤버들을 사용
  const members = selectedDrive 
    ? workspaces
        .find(ws => ws.drives.some(d => d.id === selectedDrive))
        ?.members.map(m => ({
          id: m.id,
          name: m.name,
          email: m.email,
          role: m.role === 'admin' ? 'editor' : 'viewer'
        })) ?? []
    : [];

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
