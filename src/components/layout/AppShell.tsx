
import { ReactNode } from "react";
import { ListChecks, HardDrive } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();

  const tabs = [
    {
      name: "Workflow",
      icon: ListChecks,
      path: "/"
    },
    {
      name: "Drive",
      icon: HardDrive,
      path: "/drive"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-14 border-b px-4 flex items-center justify-between bg-white">
        <div className="w-[200px]" />
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
        <div className="w-[200px]" />
      </header>
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
}
