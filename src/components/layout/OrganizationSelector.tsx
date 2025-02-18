
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export const OrganizationSelector = () => {
  const navigate = useNavigate();
  
  const organizations = [
    {
      id: "qore",
      name: "Qore - Quantit",
    },
    {
      id: "bareksa",
      name: "Bareksa",
    },
    {
      id: "kb",
      name: "KB",
    }
  ];

  const [selectedOrg, setSelectedOrg] = useState(organizations[0]);

  const handleOrgSelect = (org: typeof organizations[0]) => {
    setSelectedOrg(org);
    navigate('/workspaces');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 px-0 font-semibold hover:bg-gray-50"
        >
          <span className="text-lg">{selectedOrg.name}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {organizations.map((org) => (
          <DropdownMenuItem 
            key={org.id} 
            className="cursor-pointer"
            onClick={() => handleOrgSelect(org)}
          >
            {org.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
