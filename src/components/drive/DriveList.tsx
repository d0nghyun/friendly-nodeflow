
import { HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DriveCard } from '@/components/drive/DriveCard';
import type { Drive } from '@/types/drive';

interface DriveListProps {
  drives: (Drive & { membersCount: number })[];
}

export const DriveList = ({ drives }: DriveListProps) => {
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
          />
        ))}
      </div>
    </div>
  );
};
