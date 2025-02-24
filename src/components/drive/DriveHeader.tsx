
import { Link } from "react-router-dom";
import { ChevronLeft, Calendar, Users, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Drive } from "@/types/drive";

interface DriveHeaderProps {
  drive: Drive;
  membersCount: number;
}

export const DriveHeader = ({ drive, membersCount }: DriveHeaderProps) => {
  return (
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
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Created: {drive.createdAt || "2024-02-20"}
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {membersCount} members
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
  );
};
