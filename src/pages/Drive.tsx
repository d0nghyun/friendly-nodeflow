
import { useState } from 'react';
import { 
  ChevronLeft, 
  Search, 
  Users, 
  MoreHorizontal, 
  File, 
  Folder,
  ChevronRight,
  Globe,
  HardDrive
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
            <Card 
              key={drive.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedDrive(drive.id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-gray-500" />
                  {drive.name}
                </CardTitle>
                <CardDescription>{drive.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {drive.membersCount} members
                  </div>
                  <div>Owner: {drive.owner}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // 탐색기 뷰
  return (
    <div className="w-full h-full flex flex-col">
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSelectedDrive(null)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold">
              {drives.find(d => d.id === selectedDrive)?.name}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search files..." className="pl-8" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Modified</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {file.type === 'folder' ? (
                      <Folder className="h-4 w-4 text-gray-400" />
                    ) : (
                      <File className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="font-medium">{file.name}</span>
                    {file.shared && (
                      <Users className="h-4 w-4 text-gray-400" />
                    )}
                    {file.public && (
                      <Globe className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </TableCell>
                <TableCell>{file.modified}</TableCell>
                <TableCell>{file.owner}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Drive;
