
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from '@/components/ui/button';


const Workspaces = () => {
  const workspaces = [
    {
      id: "main",
      name: "My Workspace",
      description: "Core business processes and workflows",
      workflows: [
        { id: "flow1", name: "User Onboarding" },
        { id: "flow2", name: "Payment Processing" }
      ]
    },
    {
      id: "quanda",
      name: "Quanda",
      description: "Marketing campaigns and automation",
      workflows: [
        { id: "flow3", name: "Email Campaign" },
        { id: "flow4", name: "Social Media" }
      ]
    },
    {
      id: "model",
      name: "Model",
      description: "Sales processes and pipeline management",
      workflows: [
        { id: "flow5", name: "Lead Generation" },
        { id: "flow6", name: "Deal Pipeline" }
      ]
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Workspaces</h1>
          <p className="text-gray-500">Manage your workflows and processes</p>
        </div>
        <Button className="gap-2">
          <Grid className="h-4 w-4" />
          New Workspace
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workspaces.map((workspace) => (
          <Link key={workspace.id} to={`/workspace/${workspace.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Grid className="h-5 w-5 text-gray-500" />
                  {workspace.name}
                </CardTitle>
                <CardDescription>{workspace.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{workspace.workflows.length} workflows</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Workspaces;
