
import { ReactFlowProvider } from '@xyflow/react';
import FlowCanvas from "@/components/FlowCanvas";

const WorkflowDetail = () => {
  return (
    <div className="h-full">
      <ReactFlowProvider>
        <FlowCanvas />
      </ReactFlowProvider>
    </div>
  );
};

export default WorkflowDetail;
