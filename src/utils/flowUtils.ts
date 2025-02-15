
import { Node } from '@xyflow/react';
import { NodeData, CustomNode } from '@/types/flow';

export const createNodeFromType = (
  type: string,
  label: string,
  position: { x: number; y: number },
  id: string,
  className: string
): CustomNode => ({
  id,
  type,
  position,
  data: {
    label,
    variables: {
      system: {},
      global: {}
    },
    inputVariables: [],
    outputVariables: []
  },
  className
});

export const mapVariablesToInputs = (variables: Record<string, unknown>): Variable[] => 
  Object.entries(variables).map(([name, value]) => ({
    name,
    type: typeof value,
    value: String(value)
  }));

export const alignNodesHorizontally = (nodes: CustomNode[]): CustomNode[] => {
  const sortedNodes = [...nodes].sort((a, b) => a.position.x - b.position.x);
  const minX = sortedNodes[0]?.position.x || 0;
  const avgY = nodes.reduce((sum, node) => sum + node.position.y, 0) / nodes.length;

  return nodes.map((node, index) => ({
    ...node,
    position: {
      x: minX + index * 200,
      y: avgY
    }
  }));
};
