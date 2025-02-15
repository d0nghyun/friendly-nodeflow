
import { Button } from "@/components/ui/button";
import { Plus, AlignHorizontalJustifyCenterIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarItem } from "@/types/flow";

interface NodeToolbarProps {
  sidebarItems: SidebarItem[];
  onDragStart: (event: React.DragEvent<HTMLDivElement>, nodeType: string) => void;
  onAlignHorizontally: () => void;
}

export const NodeToolbar = ({ sidebarItems, onDragStart, onAlignHorizontally }: NodeToolbarProps) => (
  <div className="absolute left-4 top-4 z-10 flex gap-2">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="icon" className="rounded-full w-12 h-12 shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {sidebarItems.map((item) => (
          <div
            key={item.type}
            className="flex items-center gap-2 px-2 py-1.5 cursor-grab hover:bg-gray-100 rounded-sm"
            draggable
            onDragStart={(e) => onDragStart(e, item.type)}
          >
            <div className={`w-2 h-2 rounded-full ${item.className.replace('bg-', 'bg-')}`} />
            <span>{item.label}</span>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>

    <Button
      variant="default"
      size="icon"
      className="rounded-full w-12 h-12 shadow-lg"
      onClick={onAlignHorizontally}
    >
      <AlignHorizontalJustifyCenterIcon className="h-6 w-6" />
    </Button>
  </div>
);
