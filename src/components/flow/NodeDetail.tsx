
import { Node } from '@xyflow/react';
import { NodeData } from '@/types/flow';
import { NodeTypes } from './nodeTypes';

interface NodeDetailProps {
  selectedNode: Node<NodeData> | null;
  nodeTypes: NodeTypes;
  onSave: (nodeId: string, data: NodeData) => void;
}

export const NodeDetail = ({ selectedNode, nodeTypes, onSave }: NodeDetailProps) => {
  if (!selectedNode) return null;

  const NodeComponent = nodeTypes[selectedNode.type as keyof typeof nodeTypes];
  if (!NodeComponent) return null;

  const nodeData: NodeData = {
    label: String(selectedNode.data.label || 'Untitled'),
    variables: {
      system: ((selectedNode.data.variables as { system: Record<string, unknown> })?.system) || {},
      global: ((selectedNode.data.variables as { global: Record<string, unknown> })?.global) || {}
    },
    inputVariables: Array.isArray(selectedNode.data.inputVariables) 
      ? selectedNode.data.inputVariables 
      : [],
    outputVariables: Array.isArray(selectedNode.data.outputVariables)
      ? selectedNode.data.outputVariables
      : []
  };

  return (
    <div className="fixed right-0 top-0 h-screen w-96 bg-white shadow-lg border-l border-gray-200 overflow-y-auto">
      <div className="p-4">
        <NodeComponent 
          data={nodeData} 
          isPanel={true}
          onSave={(newData: NodeData) => onSave(selectedNode.id, newData)}
        />
      </div>
    </div>
  );
};
