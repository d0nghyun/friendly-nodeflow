
import { ReactFlow, Background, Controls, MiniMap, useNodesState, useEdgesState, addEdge, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useState } from 'react';
import { PanelLeft } from 'lucide-react';

const nodeTypes = {
  start: { label: 'Start Node', description: 'Define system and global variables' },
  variable: { label: 'Variable Node', description: 'Select and configure variables' },
  code: { label: 'Code Node', description: 'Execute code with templates' },
  load: { label: 'Load Node', description: 'Upload data to S3' },
  end: { label: 'End Node', description: 'Workflow completion' }
};

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
  },
  {
    id: 'variable-1',
    type: 'default',
    data: { 
      label: 'Variable Selection',
      variables: {
        input: {},
        output: {}
      }
    },
    position: { x: 250, y: 150 },
    className: 'bg-green-50 shadow-lg rounded-lg border border-green-200'
  },
  {
    id: 'code-1',
    type: 'default',
    data: { 
      label: 'Code Execution',
      variables: {
        input: {},
        output: {}
      }
    },
    position: { x: 250, y: 250 },
    className: 'bg-purple-50 shadow-lg rounded-lg border border-purple-200'
  },
  {
    id: 'load-1',
    type: 'default',
    data: { 
      label: 'Data Load',
      variables: {
        input: {},
        output: {}
      }
    },
    position: { x: 250, y: 350 },
    className: 'bg-yellow-50 shadow-lg rounded-lg border border-yellow-200'
  },
  {
    id: 'end-1',
    type: 'default',
    data: { 
      label: 'End',
      variables: {
        input: {}
      }
    },
    position: { x: 250, y: 450 },
    className: 'bg-red-50 shadow-lg rounded-lg border border-red-200'
  }
];

const initialEdges = [
  { 
    id: 'e-start-var', 
    source: 'start-1', 
    target: 'variable-1', 
    animated: true,
    style: { stroke: '#93C5FD' }
  },
  { 
    id: 'e-var-code', 
    source: 'variable-1', 
    target: 'code-1', 
    animated: true,
    style: { stroke: '#93C5FD' }
  },
  { 
    id: 'e-code-load', 
    source: 'code-1', 
    target: 'load-1', 
    animated: true,
    style: { stroke: '#93C5FD' }
  },
  { 
    id: 'e-load-end', 
    source: 'load-1', 
    target: 'end-1', 
    animated: true,
    style: { stroke: '#93C5FD' }
  }
];

const Index = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

  return (
    <div className="h-screen w-full bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-0'}`}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Node Types</h2>
          <div className="space-y-2">
            {Object.entries(nodeTypes).map(([type, info]) => (
              <div 
                key={type}
                className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="font-medium">{info.label}</div>
                <div className="text-sm text-gray-500">{info.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
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
          className="bg-gray-50"
          fitView
        >
          <Background color="#ccc" variant={BackgroundVariant.Dots} />
          <Controls className="bg-white shadow-lg border border-gray-200" />
          <MiniMap className="bg-white shadow-lg border border-gray-200" />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Index;
