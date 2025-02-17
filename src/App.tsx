
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import Index from "./pages/Index";
import Drive from "./pages/Drive";
import NotFound from "./pages/NotFound";
import Workspaces from "./pages/Workspaces";
import WorkspaceDetail from "./pages/WorkspaceDetail";
import OrganizationDetail from "./pages/OrganizationDetail";
import WorkflowDetail from "./pages/WorkflowDetail";

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
              <Route path="/" element={<Index />} />
              <Route path="/organization/:organizationId" element={<OrganizationDetail />} />
              <Route path="/drive" element={<Drive />} />
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
