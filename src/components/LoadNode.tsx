
import { useState, useEffect } from "react";
import { Handle, Position } from '@xyflow/react';
import { Badge } from "@/components/ui/badge";

export default function LoadNode({ data }: { data: any }) {
  const [uploadSource, setUploadSource] = useState("");
  const [storageMapping, setStorageMapping] = useState<Record<string, string>>({});

  useEffect(() => {
    if (data.inputVariables) {
      const newMapping: Record<string, string> = {};
      data.inputVariables.forEach((variable: any) => {
        newMapping[variable.name] = '';
      });
      setStorageMapping(newMapping);
    }
  }, [data.inputVariables]);

  return (
    <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 min-w-[150px]">
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <div className="text-sm font-medium mb-2">{data.label}</div>
      <div className="flex flex-wrap gap-1">
        {data.inputVariables?.map((variable: any, index: number) => (
          <Badge key={index} variant="outline" className="text-xs">
            {variable.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
