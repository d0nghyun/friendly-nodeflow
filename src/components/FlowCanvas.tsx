
import { ReactFlow, Background, Controls, MiniMap, useNodesState, useEdgesState, addEdge, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useState, useCallback, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { sidebarItems, initialNodes } from '../config/flowConfig';
import { CustomNode, NodeData } from '../types/flow';
import { NodeToolbar } from './flow/NodeToolbar';
import { NodeDetail } from './flow/NodeDetail';
import { nodeTypes } from './flow/nodeTypes';
import { useFlowHandlers } from '@/hooks/useFlowHandlers';
import { useNodeConnections } from '@/hooks/useNodeConnections';

const FlowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { updateConnectedNodes, onConnect: handleConnect } = useNodeConnections(nodes, setNodes, edges);
  const { onDragStart, onDrop, onDragOver, handleAlignHorizontally } = useFlowHandlers(nodes, setNodes, reactFlowWrapper);

  const onConnect = useCallback((params: any) => {
    setEdges((eds) => addEdge(params, eds));
    handleConnect(params);
  }, [setEdges, handleConnect]);

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

  return (
    <div className="h-full w-full bg-gray-50 flex">
      <div ref={reactFlowWrapper} className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onDrop={(e) => onDrop(e, sidebarItems)}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          className="bg-gray-50"
          fitView
          fitViewOptions={{
            padding: 0.2,
            maxZoom: 1
          }}
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
