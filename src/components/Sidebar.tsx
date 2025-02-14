
import { PanelLeft } from 'lucide-react';
import { SidebarItem } from '../types/flow';

interface SidebarProps {
  items: SidebarItem[];
  isOpen: boolean;
  onToggle: () => void;
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

const Sidebar = ({ items, isOpen, onToggle, onDragStart }: SidebarProps) => {
  return (
    <>
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-0'}`}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Node Types</h2>
          <div className="space-y-2">
            {items.map((item) => (
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
      <button
        onClick={onToggle}
        className="absolute top-4 left-4 z-10 p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-200"
      >
        <PanelLeft className="h-5 w-5" />
      </button>
    </>
  );
};

export default Sidebar;
