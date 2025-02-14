
import { ReactFlow, Background, Controls, MiniMap, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useState } from 'react';
import { PanelLeft } from 'lucide-react';

const initialNodes = [
  {
    id: '1',
    type: 'default',
    data: { label: 'Input Node' },
    position: { x: 250, y: 100 },
    className: 'bg-white shadow-lg rounded-lg border border-gray-200'
  },
  {
    id: '2',
    type: 'default',
    data: { label: 'Processing Node' },
    position: { x: 250, y: 200 },
    className: 'bg-white shadow-lg rounded-lg border border-gray-200'
  }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true }
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
            <div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200">
              Input Node
            </div>
            <div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200">
              Processing Node
            </div>
            <div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200">
              Output Node
            </div>
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
          <Background color="#ccc" variant="dots" />
          <Controls className="bg-white shadow-lg border border-gray-200" />
          <MiniMap className="bg-white shadow-lg border border-gray-200" />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Index;
