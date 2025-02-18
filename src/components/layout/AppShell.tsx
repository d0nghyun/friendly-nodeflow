
import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { UserMenu } from "./UserMenu";
import { Sidebar } from "./Sidebar";
import { useLocation } from "react-router-dom";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const isWorkspacePage = location.pathname.startsWith('/workspace/');

  return (
    <div className="min-h-screen flex flex-col w-full">
      <header className="h-14 border-b px-4 flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          <Navigation />
        </div>
        <div className="flex justify-end">
          <UserMenu />
        </div>
      </header>
      <div className="flex flex-1">
        {isWorkspacePage && <Sidebar />}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
