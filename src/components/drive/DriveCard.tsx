
import { HardDrive, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface DriveCardProps {
  drive: {
    id: string;
    name: string;
    description: string;
    owner: string;
    membersCount: number;
  };
  onClick: (driveId: string) => void;
}

export const DriveCard = ({ drive, onClick }: DriveCardProps) => {
  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(drive.id)}
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
  );
};
