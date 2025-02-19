
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import DriveList from "./pages/DriveList";
import DriveDetail from "./pages/DriveDetail";
import NotFound from "./pages/NotFound";
import Workspaces from "./pages/Workspaces";
import WorkspaceDetail from "./pages/WorkspaceDetail";
import OrganizationDetail from "./pages/OrganizationDetail";
import WorkflowDetail from "./pages/WorkflowDetail";
import Organizations from "./pages/Organizations";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider delayDuration={0}>
          <AppShell>
            <Routes>
              <Route path="/" element={<Navigate to="/workspaces" replace />} />
              <Route path="/organizations" element={<Organizations />} />
              <Route path="/organization/:organizationId" element={<OrganizationDetail />} />
              <Route path="/drive" element={<DriveList />} />
              <Route path="/drive/:driveId" element={<DriveDetail />} />
              <Route path="/workspaces" element={<Workspaces />} />
              <Route path="/workspace/:workspaceId" element={<WorkspaceDetail />} />
              <Route path="/:workspaceId/:workflowId" element={<WorkflowDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppShell>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
