
import { ReactFlow, Background, Controls, MiniMap, useNodesState, useEdgesState, addEdge, BackgroundVariant, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useState, useCallback } from 'react';
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
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
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

  const onNodeClick = useCallback((_: React.MouseEvent, node: CustomNode) => {
    setSelectedNode(node);
  }, []);

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.stopPropagation();
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
    setDraggedItem(nodeType);
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    setDraggedItem(null);

    const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
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
  };

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

  const handleSaveNode = useCallback((nodeId: string, newData: NodeData) => {
    setNodes(nds => nds.map(node => {
      if (node.id === nodeId) {
        return { ...node, data: newData };
      }
      return node;
    }));
    toast({
      title: "변경사항이 저장되었습니다",
      duration: 2000,
    });
  }, [setNodes, toast]);

  return (
    <div className="h-screen w-full bg-gray-50 flex">
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
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

      {isDragging && draggedItem && (
        <div 
          className="fixed top-0 left-0 pointer-events-none w-full h-full z-50 cursor-grabbing"
          style={{
            background: 'rgba(0, 0, 0, 0.1)'
          }}
        />
      )}
    </div>
  );
};

export default FlowCanvas;
