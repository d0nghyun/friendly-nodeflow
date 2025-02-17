
import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { UserMenu } from "./UserMenu";
import { Sidebar } from "./Sidebar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b px-4 flex items-center justify-between bg-white">
          <Navigation />
          <div className="flex justify-end">
            <UserMenu />
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
