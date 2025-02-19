
import { useState } from 'react';
import { DriveList } from '@/components/drive/DriveList';
import { FileExplorer } from '@/components/drive/FileExplorer';
import { SharePanel } from '@/components/drive/SharePanel';
import { workspaces } from '@/mocks/workspaceData';
import type { FileItem } from '@/types/drive';

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
  const files: FileItem[] = [
    { 
      id: 1, 
      name: 'Project Plan.pdf', 
      type: 'file',
      modified: '2024-02-20',
      owner: 'John Doe',
      shared: true,
      public: true
    },
    { 
      id: 2, 
      name: 'Assets', 
      type: 'folder',
      modified: '2024-02-19',
      owner: 'Jane Smith',
      shared: true,
      public: false
    },
    { 
      id: 3, 
      name: 'Documentation', 
      type: 'folder',
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
          role: m.role === 'admin' ? 'editor' as const : 'viewer' as const
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

  const handleDriveSelect = (driveId: string, driveName: string) => {
    setSelectedDrive(driveId);
    setCurrentPath([{ id: driveId, name: driveName }]);
  };

  if (!selectedDrive) {
    return (
      <DriveList 
        drives={drives}
        onDriveSelect={handleDriveSelect}
      />
    );
  }

  return (
    <div className="w-full h-full flex">
      <FileExplorer 
        currentPath={currentPath}
        selectedFiles={selectedFiles}
        files={files}
        onPathNavigate={handlePathNavigate}
        onFileSelect={handleFileSelect}
        onFolderOpen={handleFolderOpen}
        onShareClick={() => setShowSharePanel(true)}
      />

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
