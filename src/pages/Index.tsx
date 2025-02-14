
import { ReactFlow, Background, Controls, MiniMap, useNodesState, useEdgesState, addEdge, BackgroundVariant, Node, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useState, useCallback } from 'react';
import { PanelLeft } from 'lucide-react';
import VariablesNode from '../components/VariablesNode';
import CodeBlockNode from '../components/CodeBlockNode';
import LoadNode from '../components/LoadNode';

const nodeTypes = {
  variablesNode: VariablesNode,
  codeBlockNode: CodeBlockNode,
  loadNode: LoadNode
};

const sidebarItems = [
  { 
    type: 'start', 
    label: 'Start Node', 
    description: 'Define system and global variables',
    className: 'bg-blue-50 border-blue-200'
  },
  { 
    type: 'variablesNode', 
    label: 'Variable Node', 
    description: 'Select and configure variables',
    className: 'bg-green-50 border-green-200'
  },
  { 
    type: 'codeBlockNode', 
    label: 'Code Node', 
    description: 'Execute code with templates',
    className: 'bg-purple-50 border-purple-200'
  },
  { 
    type: 'loadNode', 
    label: 'Load Node', 
    description: 'Upload data to S3',
    className: 'bg-yellow-50 border-yellow-200'
  },
  { 
    type: 'end', 
    label: 'End Node', 
    description: 'Workflow completion',
    className: 'bg-red-50 border-red-200'
  }
];

const initialNodes = [
  {
    id: 'start-1',
    type: 'default',
    data: { 
      label: 'Start',
      variables: {
        system: {},
        global: {}
      }
    },
    position: { x: 250, y: 50 },
    className: 'bg-blue-50 shadow-lg rounded-lg border border-blue-200'
  }
];

interface NodeData {
  label: string;
  variables: any;
  inputVariables?: any[];
  outputVariables?: any[];
}

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
            return {
              ...node,
              data: {
                ...node.data,
                inputVariables: sourceNode.data.variables || []
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
                inputVariables: sourceNode.data.outputVariables || []
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
      const position = reactFlowInstance.project({
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
          }
        } as NodeData,
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

    return (
      <div className="fixed right-0 top-0 h-screen w-96 bg-white shadow-lg border-l border-gray-200 overflow-y-auto">
        <div className="p-4">
          <NodeComponent data={selectedNode.data} />
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen w-full bg-gray-50 flex">
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-0'}`}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Node Types</h2>
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <div 
                key={item.type}
                draggable
                onDragStart={(event) => onDragStart(event, item.type)}
                className="p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="font-medium">{item.label}</div>
                <div className="text-sm text-gray-500">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-4 left-4 z-10 p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-200"
        >
          <PanelLeft className="h-5 w-5" />
        </button>

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

const Index = () => {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
};

export default Index;
