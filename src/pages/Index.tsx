
import { ReactFlowProvider } from '@xyflow/react';
import FlowCanvas from '../components/FlowCanvas';

const Index = () => {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
};

export default Index;
