
import { ReactFlowProvider } from '@xyflow/react';
import FlowCanvas from '../components/FlowCanvas';

const Index = () => {
  return (
    <ReactFlowProvider>
      <div className="w-full h-full">
        <FlowCanvas />
      </div>
    </ReactFlowProvider>
  );
};

export default Index;
