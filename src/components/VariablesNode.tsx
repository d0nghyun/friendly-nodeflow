
import { useState } from "react";
import { Handle, Position } from '@xyflow/react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Variable {
  name: string;
  type: string;
  value?: string;
}

interface VariablesNodeProps {
  data: any;
  isPanel?: boolean;
  onSave?: (newData: any) => void;
}

const NodeContent = ({ data }: { data: any }) => {
  const [variables] = useState<Variable[]>(data.variables || []);

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

const PanelContent = ({ data, onSave }: { data: any; onSave?: (newData: any) => void }) => {
  const [variables, setVariables] = useState<Variable[]>(data.variables || []);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [variableName, setVariableName] = useState("");
  const [stringValue, setStringValue] = useState("");

  const addVariable = () => {
    if (selectedType && variableName) {
      const newVariable: Variable = {
        name: variableName,
        type: selectedType
      };
      
      if (selectedType === "String") {
        newVariable.value = stringValue;
      }
      
      const newVariables = [...variables, newVariable];
      setVariables(newVariables);
      
      if (onSave) {
        onSave({
          ...data,
          variables: newVariables
        });
      }

      setSelectedType("");
      setStringValue("");
      setVariableName("");
      setIsAddDialogOpen(false);
    }
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
              >
                + Add Variable
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Add Variable</DialogTitle>
              <DialogDescription>Provide a name and select a type.</DialogDescription>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center w-full">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="min-w-[150px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="String">String</SelectItem>
                      <SelectItem value="Number">Number</SelectItem>
                      <SelectItem value="Boolean">Boolean</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input 
                    value={variableName} 
                    onChange={(e) => setVariableName(e.target.value)} 
                    placeholder="Variable name"
                    className="flex-1 text-lg p-3 min-w-[300px]"
                  />
                </div>

                {selectedType === "String" && (
                  <Input 
                    value={stringValue} 
                    onChange={(e) => setStringValue(e.target.value)} 
                    placeholder="Enter value"
                    className="w-full text-lg p-3"
                  />
                )}

                <Button onClick={addVariable} className="mt-4 bg-green-500 text-white p-3 rounded text-lg">
                  Add Variable
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col gap-4">
          {variables.map((variable, index) => (
            <div key={index} className="flex items-center justify-between border p-4 rounded-md bg-white shadow-sm text-lg">
              <span className="font-medium text-gray-700 flex-1 truncate">{variable.name}</span>
              {variable.value && (
                <span className="italic text-gray-600 flex-1 truncate">"{variable.value}"</span>
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
