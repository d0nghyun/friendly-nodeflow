
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Handle, Position } from '@xyflow/react';
import { Badge } from "@/components/ui/badge";

interface OutputVariable {
  name: string;
  type: string;
}

export default function CodeBlockNode({ data }: { data: any }) {
  const [outputVariables, setOutputVariables] = useState<OutputVariable[]>([]);
  const [pythonCode, setPythonCode] = useState(`# Python script\n`);

  useEffect(() => {
    if (data.inputVariables) {
      const updatedCode = `# Python script\n${data.inputVariables.map((v: any) => 
        `${v.name} = ${v.type === 'String' ? `"${v.value}"` : 'None'}`
      ).join('\n')}\n\n# Your code here\n`;
      setPythonCode(updatedCode);
    }
  }, [data.inputVariables]);

  const handleAddOutput = (name: string, type: string) => {
    setOutputVariables(prev => [...prev, { name, type }]);
    data.outputVariables = [...outputVariables, { name, type }];
  };

  return (
    <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 min-w-[150px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
      
      <div className="text-sm font-medium mb-2">{data.label}</div>
      
      <div className="flex flex-wrap gap-1 mb-2">
        {data.inputVariables?.map((variable: any, index: number) => (
          <Badge key={index} variant="outline" className="text-xs">
            in: {variable.name}
          </Badge>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-1">
        {outputVariables.map((variable, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            out: {variable.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
