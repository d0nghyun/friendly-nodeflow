
import { ReactFlow, Background, Controls, MiniMap, useNodesState, useEdgesState, addEdge, BackgroundVariant, Node, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useState, useCallback } from 'react';
import VariablesNode from './VariablesNode';
import CodeBlockNode from './CodeBlockNode';
import LoadNode from './LoadNode';
import Sidebar from './Sidebar';
import { sidebarItems, initialNodes } from '../config/flowConfig';
import { NodeData } from '../types/flow';

const nodeTypes = {
  variablesNode: VariablesNode,
  codeBlockNode: CodeBlockNode,
  loadNode: LoadNode
};

const FlowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const reactFlowInstance = useReactFlow();

  const onConnect = useCallback((params: any) => {
    setEdges((eds) => addEdge(params, eds));
    
    const sourceNode = nodes.find(node => node.id === params.source);
    const targetNode = nodes.find(node => node.id === params.target);

    if (sourceNode && targetNode) {
      if (sourceNode.type === 'variablesNode' && targetNode.type === 'codeBlockNode') {
        setNodes(nds => nds.map(node => {
          if (node.id === targetNode.id) {
            const sourceVariables = sourceNode.data.variables || {};
            return {
              ...node,
              data: {
                ...node.data,
                label: node.data.label,
                inputVariables: Object.entries(sourceVariables).map(([name, value]) => ({
                  name,
                  type: typeof value,
                  value: String(value)
                }))
              }
            };
          }
          return node;
        }));
      } else if (sourceNode.type === 'codeBlockNode' && targetNode.type === 'loadNode') {
        setNodes(nds => nds.map(node => {
          if (node.id === targetNode.id) {
            const sourceData = sourceNode.data as NodeData;
            return {
              ...node,
              data: {
                ...node.data,
                label: node.data.label,
                inputVariables: sourceData.outputVariables || []
              }
            };
          }
          return node;
        }));
      }
    }
  }, [nodes, setNodes]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();

    const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const sidebarItem = sidebarItems.find(item => item.type === type);

    if (reactFlowBounds && sidebarItem) {
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: { 
          label: sidebarItem.label,
          variables: {
            system: {},
            global: {}
          },
          inputVariables: [] as Array<{ name: string; type: string; value?: string }>,
          outputVariables: [] as Array<{ name: string; type: string }>
        } satisfies NodeData,
        className: `shadow-lg rounded-lg border ${sidebarItem.className}`
      };

      setNodes((nds) => nds.concat(newNode));
    }
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const renderNodeDetail = () => {
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
          <NodeComponent data={nodeData} isPanel={true} />
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen w-full bg-gray-50 flex">
      <Sidebar 
        items={sidebarItems}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onDragStart={onDragStart}
      />

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
          <Background color="#ccc" variant={BackgroundVariant.Dots} />
          <Controls className="bg-white shadow-lg border border-gray-200" />
          <MiniMap className="bg-white shadow-lg border border-gray-200" />
        </ReactFlow>
      </div>

      {renderNodeDetail()}
    </div>
  );
};

export default FlowCanvas;
