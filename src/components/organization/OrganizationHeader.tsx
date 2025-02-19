
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Calendar, Users } from "lucide-react";
import type { Organization } from "@/types/organization";

interface OrganizationHeaderProps {
  organization: Organization;
}

export const OrganizationHeader = ({ organization }: OrganizationHeaderProps) => {
  const isOwner = organization.userRole === "owner";
  const isAdmin = organization.userRole === "admin" || isOwner;

  return (
    <div className="mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{organization.name}</h1>
          <p className="text-gray-500 mt-1">{organization.description}</p>
          <div className="flex gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Created: {organization.createdAt}
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {organization.membersCount} members
            </span>
          </div>
        </div>
        {isAdmin && (
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            {isOwner && (
              <Button variant="outline" className="gap-2 text-red-600 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
