
import { 
  ChevronLeft, 
  Search, 
  Users, 
  MoreHorizontal, 
  File, 
  Folder,
  ChevronRight,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Drive = () => {
  const breadcrumbs = [
    { name: 'Organization', path: '/organization' },
    { name: 'Drive', path: '/drive' },
    { name: 'Quanda', path: '/drive/quanda' },
    { name: 'cm', path: '/drive/quanda/cm' },
  ];

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

  const members = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Editor' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Viewer' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Browser' },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              {breadcrumbs.map((item, index) => (
                <div key={item.path} className="flex items-center">
                  <Button 
                    variant="ghost" 
                    className="text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    {item.name}
                  </Button>
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search files..." className="pl-8" />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Users className="h-4 w-4" />
                  Share
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share "cm" folder</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Public access</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium">{member.name}</div>
                            <div className="text-xs text-gray-500">{member.email}</div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              {member.role}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Editor</DropdownMenuItem>
                            <DropdownMenuItem>Viewer</DropdownMenuItem>
                            <DropdownMenuItem>Browser</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </TableHead>
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
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </TableCell>
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
