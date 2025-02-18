
import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { UserMenu } from "./UserMenu";
import { Sidebar } from "./Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="flex">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b px-4 flex items-center justify-between bg-white">
            <div className="flex items-center gap-4">
              <Navigation />
            </div>
            <div className="flex justify-end">
              <UserMenu />
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
