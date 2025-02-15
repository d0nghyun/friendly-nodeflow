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
    <Card className="w-full max-w-4xl p-6 border rounded-lg">
      <CardContent className="flex flex-col gap-6">
        <p className="text-2xl font-bold">Code</p>

        <Card className="w-full p-4 border rounded-lg">
          <CardContent>
            <p className="text-lg font-medium mb-2">Variables</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Variable</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.inputVariables?.map((variable, index) => (
                  <TableRow key={index}>
                    <TableCell>{variable.name}</TableCell>
                    <TableCell>{variable.value || 'N/A'}</TableCell>
                    <TableCell>{variable.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="w-full p-4 border rounded-lg">
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <Select value={selectedImage} onValueChange={setSelectedImage}>
                <SelectTrigger className="min-w-[150px]">
                  <SelectValue placeholder="Select Python Image" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="python:3.8">python:3.8</SelectItem>
                  <SelectItem value="python:3.9">python:3.9</SelectItem>
                  <SelectItem value="python:3.10">python:3.10</SelectItem>
                </SelectContent>
              </Select>
              
              <Button onClick={executeCode} className="bg-blue-500 text-white p-2 rounded">
                <PlayIcon className="w-6 h-6" />
              </Button>
            </div>
            <div className="w-full h-64 p-4 text-lg font-mono bg-gray-100 border rounded-lg overflow-auto">
              <pre>{pythonCode}</pre>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full p-4 border rounded-lg">
          <CardContent>
            <p className="text-lg font-medium mb-2">Return</p>
            <pre className="bg-white p-3 rounded text-sm overflow-auto max-h-40">{output}</pre>
          </CardContent>
        </Card>

        <Card className="w-full p-4 border rounded-lg">
          <CardContent>
            <p className="text-lg font-medium mb-2">Output Variables</p>
            <Input 
              className="w-full p-3 text-lg" 
              value={outputVariables.map(v => v.name).join(", ")} 
              onChange={(e) => {
                const names = e.target.value.split(",").map(n => n.trim());
                setOutputVariables(names.map(name => ({ name, type: "unknown" })));
              }}
              placeholder="Enter output variables..."
            />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default function CodeBlockNode({ data, isPanel = false, onSave }: NodeProps) {
  return isPanel ? <PanelContent data={data} onSave={onSave} /> : <NodeContent data={data} />;
}
