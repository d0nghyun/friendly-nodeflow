
import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Variable } from "./types";

interface AddVariableDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (variable: Variable) => void;
  disabled?: boolean;
}

export const AddVariableDialog = ({ isOpen, onOpenChange, onAdd, disabled }: AddVariableDialogProps) => {
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

  const handleAdd = () => {
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
      
      onAdd(newVariable);
      setSelectedType("");
      setSelectedSource("S3");
      setSelectedFiles([]);
      setStringValue("");
      setVariableName("");
      onOpenChange(false);
    }
  };

  const handleFileSelection = (file: string) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.includes(file) ? prevFiles.filter((f) => f !== file) : [...prevFiles, file]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8"
          disabled={disabled}
        >
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
            onClick={handleAdd}
            className="w-full h-8 text-xs"
            disabled={!selectedType || !variableName}
          >
            Add Variable
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
