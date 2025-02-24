
import { ReactFlowProvider } from '@xyflow/react';
import FlowCanvas from "@/components/FlowCanvas";

const WorkflowDetail = () => {
  return (
    <div className="p-6">
      <div className="h-[calc(100vh-8rem)] border rounded-lg overflow-hidden">
        <ReactFlowProvider>
          <FlowCanvas />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default WorkflowDetail;
