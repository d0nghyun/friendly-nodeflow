
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { PlayIcon } from "lucide-react";
import { Handle, Position } from '@xyflow/react';

export default function CodeBlockNode({ data }: { data: any }) {
  const [pythonCode, setPythonCode] = useState(`# Python script
import pandas as pd

# Your code here
`);
  const [output, setOutput] = useState("");
  const [selectedImage, setSelectedImage] = useState("python:3.9");

  const executeCode = async () => {
    try {
      const simulatedOutput = "Code execution output will appear here";
      setOutput(simulatedOutput);
    } catch (error) {
      setOutput("Error executing the script.");
    }
  };

  return (
    <Card className="min-w-[300px]">
      <CardContent className="flex flex-col gap-4 p-4">
        <Handle type="target" position={Position.Top} className="w-2 h-2" />
        <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
        
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">{data.label}</p>
          <Select value={selectedImage} onValueChange={setSelectedImage}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Python Version" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="python:3.8">Python 3.8</SelectItem>
              <SelectItem value="python:3.9">Python 3.9</SelectItem>
              <SelectItem value="python:3.10">Python 3.10</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <textarea
            value={pythonCode}
            onChange={(e) => setPythonCode(e.target.value)}
            className="w-full h-32 p-2 text-sm font-mono bg-gray-100 border rounded"
          />
          <Button 
            onClick={executeCode}
            className="absolute bottom-2 right-2"
            size="sm"
          >
            <PlayIcon className="w-4 h-4" />
          </Button>
        </div>

        {output && (
          <div className="bg-gray-100 p-2 rounded">
            <p className="text-sm font-mono">{output}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
