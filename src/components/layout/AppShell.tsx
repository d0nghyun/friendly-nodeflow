
import { ReactNode } from "react";
import { Anchor } from "lucide-react";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-14 border-b px-4 flex items-center justify-between bg-white">
        <div className="w-[200px]" />
        <div className="flex items-center gap-2">
          <Anchor className="h-4 w-4" />
          <span className="text-sm font-medium">Workflow</span>
        </div>
        <div className="w-[200px]" />
      </header>
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
}
