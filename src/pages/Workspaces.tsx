
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid } from "lucide-react";
import { Link } from "react-router-dom";

const Workspaces = () => {
  const workspaces = [
    {
      id: "main",
      name: "Main Workspace",
      description: "Core business processes and workflows",
      workflows: [
        { id: "flow1", name: "User Onboarding" },
        { id: "flow2", name: "Payment Processing" }
      ]
    },
    {
      id: "marketing",
      name: "Marketing",
      description: "Marketing campaigns and automation",
      workflows: [
        { id: "flow3", name: "Email Campaign" },
        { id: "flow4", name: "Social Media" }
      ]
    },
    {
      id: "sales",
      name: "Sales",
      description: "Sales processes and pipeline management",
      workflows: [
        { id: "flow5", name: "Lead Generation" },
        { id: "flow6", name: "Deal Pipeline" }
      ]
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Workspaces</h1>
        <p className="text-gray-500">Manage your workflows and processes</p>
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
