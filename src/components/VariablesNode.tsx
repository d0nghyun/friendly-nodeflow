
import { useState, useEffect } from "react";
import { Handle, Position } from '@xyflow/react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NodeData } from "@/types/flow";

interface Variable {
  name: string;
  type: string;
  source: string;
  value?: string;
  files?: string[];
}

interface VariablesNodeProps {
  data: NodeData;
  isPanel?: boolean;
  onSave?: (data: NodeData) => void;
}

const getInitialVariables = (data: NodeData): Variable[] => {
  const systemVariables = data.variables?.system;
  if (Array.isArray(systemVariables)) {
    return systemVariables as Variable[];
  }
  return [];
};

const NodeContent = ({ data }: { data: NodeData }) => {
  const variables = getInitialVariables(data);

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

const PanelContent = ({ data, onSave }: { data: NodeData; onSave?: (data: NodeData) => void }) => {
  const [variables, setVariables] = useState<Variable[]>(getInitialVariables(data));
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedSource, setSelectedSource] = useState("S3");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [stringValue, setStringValue] = useState("");
  const [variableName, setVariableName] = useState("");

  useEffect(() => {
    setVariables(getInitialVariables(data));
  }, [data.variables?.system]);

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
      
      const updatedVariables = [...variables, newVariable];
      setVariables(updatedVariables);
      
      if (onSave) {
        onSave({
          ...data,
          variables: {
            ...data.variables,
            system: updatedVariables
          }
        });
      }

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
    <Card className="w-full max-w-4xl p-6 border rounded-lg shadow-md">
      <CardContent className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">Variables</p>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="text-base px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => {
                  setSelectedType("");
                  setSelectedSource("S3");
                  setSelectedFiles([]);
                  setStringValue("");
                  setVariableName("");
                }}
              >
                + Add Variable
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Add Variable</DialogTitle>
              <DialogDescription>Provide a name and select a type.</DialogDescription>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center w-full">
                  <Select value={selectedType} onValueChange={handleTypeChange}>
                    <SelectTrigger className="min-w-[150px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Data">Data</SelectItem>
                      <SelectItem value="Data List">Data List</SelectItem>
                      <SelectItem value="String">String</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input 
                    value={variableName} 
                    onChange={(e) => setVariableName(e.target.value)} 
                    placeholder="Variable name"
                    className="flex-1 text-lg p-3 min-w-[300px]"
                  />
                </div>

                {(selectedType === "Data" || selectedType === "Data List") && (
                  <Select value={selectedSource} onValueChange={setSelectedSource}>
                    <SelectTrigger className="min-w-[150px]">
                      <SelectValue placeholder="Source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="S3">S3</SelectItem>
                      <SelectItem value="CM">CM</SelectItem>
                      <SelectItem value="SM">SM</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                {selectedType === "String" && (
                  <Input 
                    value={stringValue} 
                    onChange={(e) => setStringValue(e.target.value)} 
                    placeholder="Enter value"
                    className="w-full text-lg p-3"
                  />
                )}

                {selectedType && selectedSource === "S3" && (
                  <>
                    <p className="text-lg font-medium">Select Files</p>
                    <div className="flex flex-wrap gap-4 bg-gray-200 p-4 rounded">
                      {["bareska/ftp/sample.csv", "bareska/ftp/another_file.csv"].map((file) => (
                        <button 
                          key={file} 
                          className={`px-4 py-2 rounded ${selectedFiles.includes(file) ? 'bg-blue-500 text-white' : 'bg-white border'}`} 
                          onClick={() => handleFileSelection(file)}
                        >
                          {file}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                <Button onClick={addVariable} className="mt-4 bg-green-500 text-white p-3 rounded text-lg">Add Variable</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col gap-4">
          {variables.map((variable, index) => (
            <div key={index} className="flex items-center justify-between border p-4 rounded-md bg-white shadow-sm text-lg">
              <span className="font-medium text-gray-700 flex-1 truncate">{variable.name}</span>
              {variable.type === "String" ? (
                <span className="italic text-gray-600 flex-1 truncate">"{variable.value}"</span>
              ) : (
                <span className="truncate text-gray-500 flex-1">{variable.files?.length > 0 ? variable.files.join(", ") : "No files selected"}</span>
              )}
              <span className="text-gray-500 text-lg">{variable.type}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function VariablesNode({ data, isPanel = false, onSave }: VariablesNodeProps) {
  return isPanel ? <PanelContent data={data} onSave={onSave} /> : <NodeContent data={data} />;
}
