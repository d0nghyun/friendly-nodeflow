
import { Link } from "react-router-dom";
import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Organization } from "@/types/organization";

interface OrganizationHeaderProps {
  organization: Organization;
}

export const OrganizationHeader = ({ organization }: OrganizationHeaderProps) => {
  const isOwner = organization.userRole === "owner";
  const isAdmin = organization.userRole === "admin" || isOwner;

  return (
    <div className="mb-6">
      <Link to="/">
        <Button variant="ghost" className="gap-2 mb-4">
          <ChevronLeft className="h-4 w-4" />
          Back to Organizations
        </Button>
      </Link>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{organization.name}</h1>
          <p className="text-gray-500 mt-1">{organization.description}</p>
          <div className="flex gap-4 mt-2 text-sm text-gray-500">
            <span>Owner: {organization.owner.name}</span>
            <span>Created: {organization.createdAt}</span>
            <span>{organization.membersCount} members</span>
          </div>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <Button variant="outline" className="gap-2">
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
          )}
          {isOwner && (
            <Button variant="outline" className="gap-2 text-red-600 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
              Delete Organization
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
