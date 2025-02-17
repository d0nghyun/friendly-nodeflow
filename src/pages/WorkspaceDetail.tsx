
import { useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const WorkspaceDetail = () => {
  const { workspaceId } = useParams();

  const workspaces = {
    main: {
      id: "main",
      name: "Main Workspace",
      description: "Core business processes and workflows",
      workflows: [
        { id: "flow1", name: "User Onboarding", description: "Customer onboarding automation" },
        { id: "flow2", name: "Payment Processing", description: "Payment handling workflow" }
      ]
    },
    marketing: {
      id: "marketing",
      name: "Marketing",
      description: "Marketing campaigns and automation",
      workflows: [
        { id: "flow3", name: "Email Campaign", description: "Automated email marketing" },
        { id: "flow4", name: "Social Media", description: "Social media content management" }
      ]
    },
    sales: {
      id: "sales",
      name: "Sales",
      description: "Sales processes and pipeline management",
      workflows: [
        { id: "flow5", name: "Lead Generation", description: "Sales lead management" },
        { id: "flow6", name: "Deal Pipeline", description: "Sales pipeline tracking" }
      ]
    }
  };

  const workspace = workspaces[workspaceId as keyof typeof workspaces];

  if (!workspace) {
    return <div>Workspace not found</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/workspaces">
          <Button variant="ghost" className="gap-2 mb-4">
            <ChevronLeft className="h-4 w-4" />
            Back to Workspaces
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{workspace.name}</h1>
        <p className="text-gray-500">{workspace.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workspace.workflows.map((workflow) => (
          <Link key={workflow.id} to={`/${workspace.id}/${workflow.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-gray-500"
                  >
                    <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"/>
                    <path d="M12 16v-4"/>
                    <path d="M12 8h.01"/>
                  </svg>
                  {workflow.name}
                </CardTitle>
                <CardDescription>{workflow.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceDetail;
