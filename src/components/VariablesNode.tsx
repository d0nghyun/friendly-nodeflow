import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    const defaultNames = {
      "Data": "var_data",
      "Data List": "var_data_list",
      "String": "var_str"
    };
    setVariableName(defaultNames[type as keyof typeof defaultNames] || "var_unknown");
    if (type === "Data" || type === "Data List") {
      setSelectedSource("S3");
    } else {
      setSelectedSource("");
    }
  };

  const addVariable = () => {
    if (selectedType && variableName) {
      const newVariable: Variable = {
        name: variableName,
        type: selectedType,
        source: selectedSource
      };
      
      if (selectedType === "String") {
        newVariable.value = stringValue;
      } else if (selectedSource === "S3") {
        newVariable.files = [...selectedFiles];
      }
      
      setVariables((prevVariables) => [...prevVariables, newVariable]);
      setSelectedType("");
      setSelectedSource("S3");
      setSelectedFiles([]);
      setStringValue("");
      setVariableName("");
      setIsAddDialogOpen(false);
    }
  };

  const handleFileSelection = (file: string) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.includes(file) ? prevFiles.filter((f) => f !== file) : [...prevFiles, file]
    );
  };

  return (
    <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 min-w-[150px]">
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
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
