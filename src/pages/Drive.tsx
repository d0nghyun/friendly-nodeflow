
import { useState } from 'react';
import { HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DriveCard } from '@/components/drive/DriveCard';
import { ExplorerHeader } from '@/components/drive/ExplorerHeader';
import { FilesList } from '@/components/drive/FilesList';

const Drive = () => {
  const [selectedDrive, setSelectedDrive] = useState<string | null>(null);

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
              onClick={setSelectedDrive}
            />
          ))}
        </div>
      </div>
    );
  }

  const currentDrive = drives.find(d => d.id === selectedDrive);

  return (
    <div className="w-full h-full flex flex-col">
      <ExplorerHeader 
        driveName={currentDrive?.name || ""} 
        onBack={() => setSelectedDrive(null)} 
      />
      <FilesList files={files} />
    </div>
  );
};

export default Drive;
