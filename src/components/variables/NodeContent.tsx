
import { useState, useEffect } from "react";
import { Handle, Position } from '@xyflow/react';
import { Badge } from "@/components/ui/badge";
import { NodeData } from "@/types/flow";
import { getInitialVariables } from "./utils";

export const NodeContent = ({ data }: { data: NodeData }) => {
  const [variables, setVariables] = useState(getInitialVariables(data));

  useEffect(() => {
    setVariables(getInitialVariables(data));
  }, [data.variables?.system]);

  return (
    <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 min-w-[150px]">
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <div className="text-sm font-medium mb-2">{data.label}</div>
      <div className="flex flex-wrap gap-1">
        {variables.map((variable, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {variable.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};
