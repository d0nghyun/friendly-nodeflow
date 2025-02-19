
import { useCallback } from 'react';
import { Connection, Edge } from '@xyflow/react';
import { CustomNode } from '@/types/flow';
import { mapVariablesToInputs } from '@/utils/flowUtils';

export const useNodeConnections = (
  nodes: CustomNode[],
  setNodes: React.Dispatch<React.SetStateAction<CustomNode[]>>,
  edges: Edge[],
) => {
  const updateConnectedNodes = useCallback((updatedNode: CustomNode) => {
    const connectedEdges = edges.filter(edge => edge.source === updatedNode.id);
    
    connectedEdges.forEach(edge => {
      const targetNode = nodes.find(node => node.id === edge.target);
      if (targetNode) {
        if (updatedNode.type === 'variablesNode' && 
           (targetNode.type === 'codeBlockNode' || targetNode.type === 'loadNode')) {
          setNodes(nds => nds.map(node => {
            if (node.id === targetNode.id) {
              return {
                ...node,
                data: {
                  ...node.data,
                  inputVariables: mapVariablesToInputs(updatedNode.data.variables.system)
                }
              };
            }
            return node;
          }));
        } else if (updatedNode.type === 'codeBlockNode' && targetNode.type === 'loadNode') {
          setNodes(nds => nds.map(node => {
            if (node.id === targetNode.id) {
              return {
                ...node,
                data: {
                  ...node.data,
                  inputVariables: updatedNode.data.outputVariables
                }
              };
            }
            return node;
          }));
        }
      }
    });
  }, [edges, nodes, setNodes]);

  const onConnect = useCallback((params: Connection) => {
    const sourceNode = nodes.find(node => node.id === params.source);
    const targetNode = nodes.find(node => node.id === params.target);

    if (sourceNode && targetNode) {
      if (sourceNode.type === 'variablesNode' && targetNode.type === 'codeBlockNode') {
        setNodes(nds => nds.map(node => {
          if (node.id === targetNode.id) {
            return {
              ...node,
              data: {
                ...node.data,
                inputVariables: mapVariablesToInputs(sourceNode.data.variables.system)
              }
            };
          }
          return node;
        }));
      } else if (sourceNode.type === 'variablesNode' && targetNode.type === 'loadNode') {
        setNodes(nds => nds.map(node => {
          if (node.id === targetNode.id) {
            return {
              ...node,
              data: {
                ...node.data,
                inputVariables: mapVariablesToInputs(sourceNode.data.variables.system)
              }
            };
          }
          return node;
        }));
      } else if (sourceNode.type === 'codeBlockNode' && targetNode.type === 'loadNode') {
        setNodes(nds => nds.map(node => {
          if (node.id === targetNode.id) {
            return {
              ...node,
              data: {
                ...node.data,
                inputVariables: sourceNode.data.outputVariables
              }
            };
          }
          return node;
        }));
      }
    }
  }, [nodes, setNodes]);

  return {
    updateConnectedNodes,
    onConnect
  };
};
