
import { Grid, ChevronDown, ChevronRight } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { workspaces } from "@/mocks/workspaceData";

export const Sidebar = () => {
  const location = useLocation();
  const { workspaceId, workflowId } = useParams();
  const [expandedWorkspaces, setExpandedWorkspaces] = useState<string[]>([workspaceId || '']);

  useEffect(() => {
    if (workspaceId && !expandedWorkspaces.includes(workspaceId)) {
      setExpandedWorkspaces(prev => [...prev, workspaceId]);
    }
  }, [workspaceId, workflowId]); // workflowId도 의존성 배열에 추가

  const toggleWorkspace = (workspaceId: string) => {
    setExpandedWorkspaces(prev => 
      prev.includes(workspaceId)
        ? prev.filter(id => id !== workspaceId)
        : [...prev, workspaceId]
    );
  };

  return (
    <div className="w-64 h-[calc(100vh-3.5rem)] border-r bg-white">
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {workspaces.map(workspace => (
          <Collapsible
            key={workspace.id}
            open={expandedWorkspaces.includes(workspace.id)}
            onOpenChange={() => toggleWorkspace(workspace.id)}
          >
            <CollapsibleTrigger className="flex items-center gap-2 text-gray-600 w-full hover:bg-gray-50 rounded p-1">
              {expandedWorkspaces.includes(workspace.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <Grid className="h-4 w-4" />
              <span className="text-sm font-medium">{workspace.name}</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-1 pl-6 mt-1">
                {workspace.workflows.map(workflow => {
                  const isActive = location.pathname === `/${workspace.id}/${workflow.id}`;
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
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
