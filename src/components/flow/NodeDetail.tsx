
import { Node } from '@xyflow/react';
import { NodeData } from '@/types/flow';
import { NodeTypes } from './nodeTypes';
import { X } from 'lucide-react';

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
    ...selectedNode.data,
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
    <div className="fixed right-8 top-8 bottom-8 w-[420px] bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-700">{selectedNode.type}</h3>
          <button 
            onClick={() => onSave(selectedNode.id, nodeData)}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <NodeComponent 
            data={nodeData} 
            isPanel={true}
            onSave={(newData: NodeData) => onSave(selectedNode.id, newData)}
          />
        </div>
      </div>
    </div>
  );
};
