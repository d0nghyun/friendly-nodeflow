
import { ReactNode } from "react";
import { HardDrive, User, Settings, ChevronDown, Folder, Grid } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();

  const tabs = [
    {
      name: "Drive",
      icon: HardDrive,
      path: "/drive"
    }
  ];

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

  const workspaces = [
    {
      id: "main",
      name: "Main Workspace",
      workflows: [
        { id: "flow1", name: "User Onboarding" },
        { id: "flow2", name: "Payment Processing" }
      ]
    },
    {
      id: "marketing",
      name: "Marketing",
      workflows: [
        { id: "flow3", name: "Email Campaign" },
        { id: "flow4", name: "Social Media" }
      ]
    },
    {
      id: "sales",
      name: "Sales",
      workflows: [
        { id: "flow5", name: "Lead Generation" },
        { id: "flow6", name: "Deal Pipeline" }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white flex flex-col">
        <div className="h-14 border-b px-4 flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 px-0 font-semibold hover:bg-gray-50"
              >
                <span className="text-lg">Qore - Quantit</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {organizations.map((org) => (
                <DropdownMenuItem key={org.id} className="cursor-pointer">
                  {org.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex-1 p-4 space-y-6 overflow-y-auto">
          {workspaces.map((workspace) => (
            <div key={workspace.id} className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Grid className="h-4 w-4" />
                <span className="text-sm font-medium">{workspace.name}</span>
              </div>
              <div className="space-y-1 pl-6">
                {workspace.workflows.map((workflow) => (
                  <Link
                    key={workflow.id}
                    to={`/${workspace.id}/${workflow.id}`}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 py-1 px-2 rounded hover:bg-gray-50"
                  >
                    <Folder className="h-4 w-4" />
                    <span>{workflow.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b px-4 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = location.pathname === tab.path;
              
              return (
                <Link
                  key={tab.name}
                  to={tab.path}
                  className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors ${
                    isActive 
                      ? "bg-gray-100 text-gray-900" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{tab.name}</span>
                </Link>
              );
            })}
          </div>
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="h-8 w-8 rounded-full border-2 border-gray-200 p-0"
                >
                  <User className="h-4 w-4" />
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="rounded-full bg-gray-100 p-1">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-gray-500">john@example.com</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
