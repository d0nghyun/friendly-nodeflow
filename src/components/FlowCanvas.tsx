import { ReactFlow, Background, Controls, MiniMap, useNodesState, useEdgesState, addEdge, BackgroundVariant, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useState, useCallback, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { sidebarItems, initialNodes } from '../config/flowConfig';
import { NodeData, CustomNode } from '../types/flow';
import { NodeToolbar } from './flow/NodeToolbar';
import { NodeDetail } from './flow/NodeDetail';
import { nodeTypes } from './flow/nodeTypes';
import { createNodeFromType, mapVariablesToInputs, alignNodesHorizontally } from '../utils/flowUtils';

const FlowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useReactFlow();
  const { toast } = useToast();

  const onConnect = useCallback((params: any) => {
    setEdges((eds) => addEdge(params, eds));
    
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

  const handleSaveNode = useCallback((nodeId: string, newData: NodeData) => {
    setNodes(nds => {
      const updatedNodes = nds.map(node => {
        if (node.id === nodeId) {
          const updatedNode = {
            ...node,
            data: {
              ...node.data,
              ...newData
            }
          };
          // 노드 데이터가 변경되면 연결된 노드들도 업데이트
          setTimeout(() => updateConnectedNodes(updatedNode), 0);
          return updatedNode;
        }
        return node;
      });
      return updatedNodes;
    });
    
    toast({
      title: "변경사항이 저장되었습니다",
      duration: 2000,
    });
  }, [setNodes, toast, updateConnectedNodes]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: CustomNode) => {
    event.stopPropagation();
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onDragStart = useCallback((event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const sidebarItem = sidebarItems.find(item => item.type === type);

    if (reactFlowBounds && sidebarItem) {
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = createNodeFromType(
        type,
        sidebarItem.label,
        position,
        `${type}-${nodes.length + 1}`,
        `shadow-lg rounded-lg border ${sidebarItem.className}`
      );

      setNodes((nds) => [...nds, newNode]);
    }
  }, [reactFlowInstance, nodes, setNodes]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleAlignHorizontally = useCallback(() => {
    setNodes(nodes => alignNodesHorizontally(nodes));
    toast({
      title: "노드들이 수평으로 정렬되었습니다",
      duration: 2000,
    });
  }, [setNodes, toast]);

  return (
    <div className="h-screen w-full bg-gray-50 flex">
      <div ref={reactFlowWrapper} className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          className="bg-gray-50"
          fitView
        >
          <NodeToolbar
            sidebarItems={sidebarItems}
            onDragStart={onDragStart}
            onAlignHorizontally={handleAlignHorizontally}
          />
          <Background color="#ccc" variant={BackgroundVariant.Dots} />
          <Controls className="bg-white shadow-lg border border-gray-200" />
          <MiniMap className="bg-white shadow-lg border border-gray-200" />
        </ReactFlow>
      </div>

      <NodeDetail
        selectedNode={selectedNode}
        nodeTypes={nodeTypes}
        onSave={handleSaveNode}
      />
    </div>
  );
};

export default FlowCanvas;
