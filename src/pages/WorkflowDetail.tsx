
import { ReactFlowProvider } from '@xyflow/react';
import { ChevronLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import FlowCanvas from "@/components/FlowCanvas";
import { Button } from '@/components/ui/button';

const WorkflowDetail = () => {
  const { workspaceId } = useParams();

  return (
    <div className="p-6">
      <Link to={`/workspace/${workspaceId}`}>
        <Button variant="ghost" className="gap-2 mb-4">
          <ChevronLeft className="h-4 w-4" />
          Back to Workspace
        </Button>
      </Link>
      <div className="h-[calc(100vh-8rem)] border rounded-lg overflow-hidden">
        <ReactFlowProvider>
          <FlowCanvas />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default WorkflowDetail;
