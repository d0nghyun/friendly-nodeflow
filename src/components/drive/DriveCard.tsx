
import { HardDrive, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface DriveCardProps {
  drive: {
    id: string;
    name: string;
    description: string;
    membersCount: number;
  };
}

export const DriveCard = ({ drive }: DriveCardProps) => {
  return (
    <Link to={`/drive/${drive.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-gray-500" />
            {drive.name}
          </CardTitle>
          <CardDescription>{drive.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            {drive.membersCount} members
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
