
import { Grid, ChevronDown, ChevronRight, ChevronLeftSquare, ChevronRightSquare } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { workspaces } from "@/mocks/workspaceData";
import { Button } from "@/components/ui/button";

export const Sidebar = () => {
  const location = useLocation();
  const { workspaceId, workflowId } = useParams();
  const [expandedWorkspaces, setExpandedWorkspaces] = useState<string[]>(() => 
    workspaceId ? [workspaceId] : []
  );
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(workspaceId || null);

  useEffect(() => {
    const pathMatch = location.pathname.match(/^\/([^/]+)\/([^/]+)$/);
    const currentWorkspaceId = pathMatch?.[1];
    
    if (currentWorkspaceId) {
      setActiveWorkspaceId(currentWorkspaceId);
      if (!expandedWorkspaces.includes(currentWorkspaceId)) {
        setExpandedWorkspaces([currentWorkspaceId]);
      }
    }
  }, [location.pathname]);

  const toggleWorkspace = (workspaceId: string) => {
    if (workspaceId === activeWorkspaceId) {
      setExpandedWorkspaces(prev => 
        prev.includes(workspaceId) ? [] : [workspaceId]
      );
    } else {
      setActiveWorkspaceId(workspaceId);
      setExpandedWorkspaces([workspaceId]);
    }
  };

  const pathMatch = location.pathname.match(/^\/([^/]+)\/([^/]+)$/);
  const currentWorkspaceId = pathMatch?.[1] || workspaceId;
  const currentWorkflowId = pathMatch?.[2] || workflowId;

  return (
    <div className={`relative h-[calc(100vh-3.5rem)] border-r bg-white transition-all duration-300 ${
      isSidebarCollapsed ? 'w-16' : 'w-64'
    }`}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-2 z-50"
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      >
        {isSidebarCollapsed ? (
          <ChevronRightSquare className="h-4 w-4" />
        ) : (
          <ChevronLeftSquare className="h-4 w-4" />
        )}
      </Button>
      
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {workspaces.map(workspace => (
          <Collapsible
            key={workspace.id}
            open={expandedWorkspaces.includes(workspace.id)}
            onOpenChange={() => toggleWorkspace(workspace.id)}
          >
            <CollapsibleTrigger className={`flex items-center gap-2 w-full hover:bg-gray-50 rounded p-1 ${
              workspace.id === activeWorkspaceId ? 'text-gray-900' : 'text-gray-600'
            }`}>
              {isSidebarCollapsed ? (
                <Link to={`/workspace/${workspace.id}`} className="flex items-center">
                  <Grid className="h-4 w-4" />
                </Link>
              ) : (
                <>
                  {expandedWorkspaces.includes(workspace.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <Link to={`/workspace/${workspace.id}`} className="flex items-center gap-2 flex-1">
                    <Grid className="h-4 w-4" />
                    <span className="text-sm font-medium">{workspace.name}</span>
                  </Link>
                </>
              )}
            </CollapsibleTrigger>
            {!isSidebarCollapsed && (
              <CollapsibleContent>
                <div className="space-y-1 pl-6 mt-1">
                  {workspace.workflows.map(workflow => {
                    const isActive = currentWorkspaceId === workspace.id && currentWorkflowId === workflow.id;
                    return (
                      <Link
                        key={workflow.id}
                        to={`/${workspace.id}/${workflow.id}`}
                        className={`flex items-center gap-2 text-sm py-1 px-2 rounded transition-colors ${
                          isActive 
                            ? "bg-gray-100 text-gray-900" 
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className={`${isActive ? "text-gray-900" : "text-gray-500"}`}
                        >
                          <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"/>
                          <path d="M12 16v-4"/>
                          <path d="M12 8h.01"/>
                        </svg>
                        <span>{workflow.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </CollapsibleContent>
            )}
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
