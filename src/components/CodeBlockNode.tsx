import { useState, useEffect } from "react";
import { Handle, Position } from '@xyflow/react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { PlayIcon } from "lucide-react";
import { NodeProps } from "@/types/flow";

const NodeContent = ({ data }: NodeProps) => (
  <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 min-w-[150px]">
    <Handle type="target" position={Position.Left} className="w-2 h-2" />
    <Handle type="source" position={Position.Right} className="w-2 h-2" />
    <div className="text-sm font-medium mb-2">{data.label}</div>
    <div className="flex flex-wrap gap-1 mb-2">
      {Array.isArray(data.inputVariables) && data.inputVariables.map((variable, index) => (
        <Badge key={index} variant="outline" className="text-xs">
          in: {variable.name}
        </Badge>
      ))}
    </div>
    <div className="flex flex-wrap gap-1">
      {Array.isArray(data.outputVariables) && data.outputVariables.map((variable, index) => (
        <Badge key={index} variant="secondary" className="text-xs">
          out: {variable.name}
        </Badge>
      ))}
    </div>
  </div>
);

const PanelContent = ({ data, onSave }: NodeProps) => {
  const [outputVariables, setOutputVariables] = useState(data.outputVariables);
  const [pythonCode, setPythonCode] = useState(`# Python script\n`);
  const [output, setOutput] = useState("");
  const [selectedImage, setSelectedImage] = useState("python:3.9");

  useEffect(() => {
    if (Array.isArray(data.inputVariables) && data.inputVariables.length > 0) {
      const updatedCode = `# Python script\n${data.inputVariables.map((v) => 
        `${v.name} = ${v.type === 'String' ? `"${v.value || ''}"` : 'None'}`
      ).join('\n')}\n\n# Your code here\n`;
      setPythonCode(updatedCode);
    }
  }, [data.inputVariables]);

  const executeCode = () => {
    setOutput("Code execution simulation completed");
    if (onSave) {
      onSave({
        ...data,
        outputVariables
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-900 mb-4">Code Block</div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-700 mb-2">Variables</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Variable</TableHead>
                <TableHead className="text-xs">Value</TableHead>
                <TableHead className="text-xs">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.inputVariables?.map((variable, index) => (
                <TableRow key={index}>
                  <TableCell className="text-xs">{variable.name}</TableCell>
                  <TableCell className="text-xs">{variable.value || 'N/A'}</TableCell>
                  <TableCell className="text-xs">{variable.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <Select value={selectedImage} onValueChange={setSelectedImage} className="w-32">
              <SelectTrigger className="text-xs h-8">
                <SelectValue placeholder="Python Image" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python:3.8">python:3.8</SelectItem>
                <SelectItem value="python:3.9">python:3.9</SelectItem>
                <SelectItem value="python:3.10">python:3.10</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={executeCode} size="sm" className="h-8">
              <PlayIcon className="w-4 h-4" />
            </Button>
          </div>
          <div className="w-full h-48 p-3 text-xs font-mono bg-white border rounded-lg overflow-auto">
            <pre>{pythonCode}</pre>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-700 mb-2">Return</p>
          <pre className="bg-white p-2 rounded text-xs overflow-auto max-h-32 border">{output}</pre>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-700 mb-2">Output Variables</p>
          <Input 
            className="text-xs h-8" 
            value={outputVariables.map(v => v.name).join(", ")} 
            onChange={(e) => {
              const names = e.target.value.split(",").map(n => n.trim());
              setOutputVariables(names.map(name => ({ name, type: "unknown" })));
            }}
            placeholder="Enter output variables..."
          />
        </div>
      </div>
    </div>
  );
};

export default function CodeBlockNode({ data, isPanel = false, onSave }: NodeProps) {
  return isPanel ? <PanelContent data={data} onSave={onSave} /> : <NodeContent data={data} />;
}
