
import { useState, useEffect } from "react";
import { Handle, Position } from '@xyflow/react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { NodeData } from "@/types/flow";
import { Plus } from "lucide-react";

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

const arrayToRecord = (variables: Variable[]): Record<string, unknown> => {
  return variables.reduce((acc, variable) => ({
    ...acc,
    [variable.name]: variable
  }), {});
};

const recordToArray = (record: Record<string, unknown>): Variable[] => {
  if (!record) return [];
  return Object.values(record).map(value => value as Variable);
};

const getInitialVariables = (data: NodeData): Variable[] => {
  const systemVariables = data.variables?.system;
  if (Array.isArray(systemVariables)) {
    return systemVariables as Variable[];
  }
  return recordToArray(systemVariables as Record<string, unknown>);
};

const NodeContent = ({ data }: { data: NodeData }) => {
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
            system: arrayToRecord(updatedVariables)
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
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-900 mb-4">Variables</div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-xs font-medium text-gray-700">Variable List</p>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Plus className="h-4 w-4 mr-1" />
                <span className="text-xs">Add Variable</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogTitle className="text-sm font-medium mb-4">Add New Variable</DialogTitle>
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <Select value={selectedType} onValueChange={handleTypeChange}>
                    <SelectTrigger className="text-xs h-8 flex-1">
                      <SelectValue placeholder="Select Type" />
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
                    className="text-xs h-8 flex-1"
                  />
                </div>

                {(selectedType === "Data" || selectedType === "Data List") && (
                  <Select value={selectedSource} onValueChange={setSelectedSource}>
                    <SelectTrigger className="text-xs h-8">
                      <SelectValue placeholder="Select Source" />
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
                    className="text-xs h-8"
                  />
                )}

                {selectedType && selectedSource === "S3" && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-700">Select Files</p>
                    <div className="grid grid-cols-1 gap-2 bg-gray-50 p-3 rounded-lg">
                      {["bareska/ftp/sample.csv", "bareska/ftp/another_file.csv"].map((file) => (
                        <button 
                          key={file}
                          onClick={() => handleFileSelection(file)}
                          className={`px-3 py-2 rounded text-xs text-left ${
                            selectedFiles.includes(file)
                              ? 'bg-blue-500 text-white'
                              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {file}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <Button
                  onClick={addVariable}
                  className="w-full h-8 text-xs"
                  disabled={!selectedType || !variableName}
                >
                  Add Variable
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Name</TableHead>
                <TableHead className="text-xs">Type</TableHead>
                <TableHead className="text-xs">Value/Files</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variables.map((variable, index) => (
                <TableRow key={index}>
                  <TableCell className="text-xs font-medium">{variable.name}</TableCell>
                  <TableCell className="text-xs">{variable.type}</TableCell>
                  <TableCell className="text-xs text-gray-500">
                    {variable.type === "String" 
                      ? variable.value 
                      : variable.files?.join(", ") || "No files selected"}
                  </TableCell>
                </TableRow>
              ))}
              {variables.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-xs text-center text-gray-500 py-4">
                    No variables added yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default function VariablesNode({ data, isPanel = false, onSave }: VariablesNodeProps) {
  return isPanel ? <PanelContent data={data} onSave={onSave} /> : <NodeContent data={data} />;
}
