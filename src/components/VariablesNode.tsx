
import { useState } from "react";
import { Handle, Position } from '@xyflow/react';
import { Badge } from "@/components/ui/badge";

interface Variable {
  name: string;
  type: string;
  source: string;
  value?: string;
  files?: string[];
}

export default function VariablesNode({ data }: { data: any }) {
  const [variables, setVariables] = useState<Variable[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedSource, setSelectedSource] = useState("S3");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [stringValue, setStringValue] = useState("");
  const [variableName, setVariableName] = useState("");

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
}
