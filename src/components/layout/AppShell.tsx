
import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { UserMenu } from "./UserMenu";
import { Sidebar } from "./Sidebar";
import { useLocation } from "react-router-dom";
import { OrganizationSelector } from "./OrganizationSelector";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const showSidebar = location.pathname.startsWith('/workspace/') || 
                      location.pathname.match(/^\/[^/]+\/[^/]+$/); // Matches /:workspaceId/:workflowId

  return (
    <div className="min-h-screen flex flex-col w-full">
      <header className="h-14 border-b px-4 flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          <OrganizationSelector />
          <Navigation />
        </div>
        <div className="flex justify-end">
          <UserMenu />
        </div>
      </header>
      <div className="flex flex-1">
        {showSidebar && <Sidebar />}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
