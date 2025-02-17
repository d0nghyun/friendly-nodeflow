
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 px-0 font-semibold hover:bg-gray-50"
          onClick={() => navigate('/')}
        >
          <span className="text-lg">Qore - Quantit</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {organizations.map((org) => (
          <DropdownMenuItem 
            key={org.id} 
            className="cursor-pointer"
            onClick={() => navigate('/')}
          >
            {org.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
