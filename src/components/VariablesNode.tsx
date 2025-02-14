import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VariablesNode({ data }: { data: any }) {
  const [variables, setVariables] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedSource, setSelectedSource] = useState("S3");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [stringValue, setStringValue] = useState("");
  const [variableName, setVariableName] = useState("");

  const handleTypeChange = (type) => {
    setSelectedType(type);
    const defaultNames = {
      "Data": "var_data",
      "Data List": "var_data_list",
      "String": "var_str"
    };
    setVariableName(defaultNames[type] || "var_unknown");
    if (type === "Data" || type === "Data List") {
      setSelectedSource("S3");
    } else {
      setSelectedSource("");
    }
  };

  const addVariable = () => {
    if (selectedType && variableName) {
      const newVariable = { name: variableName, type: selectedType, source: selectedSource };
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

  const handleFileSelection = (file) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.includes(file) ? prevFiles.filter((f) => f !== file) : [...prevFiles, file]
    );
  };

  return (
    <Card className="min-w-[300px]">
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">{data.label}</p>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="text-sm px-3 py-1"
                onClick={() => {
                  setSelectedType("");
                  setSelectedSource("S3");
                  setSelectedFiles([]);
                  setStringValue("");
                  setVariableName("");
                }}
              >
                + Add
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

        <div className="flex flex-col gap-2">
          {variables.map((variable, index) => (
            <div key={index} className="flex items-center justify-between border p-2 rounded-md bg-white shadow-sm text-sm">
              <span className="font-medium text-gray-700 flex-1 truncate">{variable.name}</span>
              {variable.type === "String" ? (
                <span className="italic text-gray-600 flex-1 truncate">"{variable.value}"</span>
              ) : (
                <span className="truncate text-gray-500 flex-1">{variable.files?.length > 0 ? variable.files.join(", ") : "No files selected"}</span>
              )}
              <span className="text-gray-500">{variable.type}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
