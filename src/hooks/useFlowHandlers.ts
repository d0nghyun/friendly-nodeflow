
import { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';
import { useToast } from "@/components/ui/use-toast";
import { CustomNode } from '@/types/flow';
import { createNodeFromType } from '@/utils/flowUtils';

export const useFlowHandlers = (
  nodes: CustomNode[],
  setNodes: React.Dispatch<React.SetStateAction<CustomNode[]>>,
  reactFlowWrapper: React.RefObject<HTMLDivElement>
) => {
  const reactFlowInstance = useReactFlow();
  const { toast } = useToast();

  const onDragStart = useCallback((event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  const onDrop = useCallback((event: React.DragEvent, sidebarItems: any[]) => {
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
  }, [reactFlowInstance, nodes, setNodes, reactFlowWrapper]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleAlignHorizontally = useCallback(() => {
    setNodes(nodes => {
      const sortedNodes = [...nodes].sort((a, b) => a.position.x - b.position.x);
      const minX = sortedNodes[0]?.position.x || 0;
      const avgY = nodes.reduce((sum, node) => sum + node.position.y, 0) / nodes.length;
    
      return nodes.map((node, index) => ({
        ...node,
        position: {
          x: minX + index * 200,
          y: avgY
        }
      }));
    });
    
    toast({
      title: "노드들이 수평으로 정렬되었습니다",
      duration: 2000,
    });
  }, [setNodes, toast]);

  return {
    onDragStart,
    onDrop,
    onDragOver,
    handleAlignHorizontally
  };
};
