
import { useState, useEffect } from "react";
import { NodeContent } from "./variables/NodeContent";
import { AddVariableDialog } from "./variables/AddVariableDialog";
import { VariablesTable } from "./variables/VariablesTable";
import { VariablesNodeProps, Variable } from "./variables/types";
import { getInitialVariables, arrayToRecord } from "./variables/utils";
import { NodeData } from "@/types/flow";

const PanelContent = ({ data, onSave }: { data: NodeData; onSave?: (data: NodeData) => void }) => {
  const [variables, setVariables] = useState<Variable[]>(getInitialVariables(data));
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    setVariables(getInitialVariables(data));
  }, [data.variables?.system]);

  const handleAddVariable = (newVariable: Variable) => {
    // 하나의 노드 블록은 하나의 변수만 선언할 수 있음
    if (variables.length > 0) {
      const updatedVariables = [newVariable];
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
    } else {
      setVariables([newVariable]);
      
      if (onSave) {
        onSave({
          ...data,
          variables: {
            ...data.variables,
            system: arrayToRecord([newVariable])
          }
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-900 mb-4">Variables</div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-xs font-medium text-gray-700">Variable List</p>
          <AddVariableDialog 
            isOpen={isAddDialogOpen}
            onOpenChange={setIsAddDialogOpen}
            onAdd={handleAddVariable}
            isDisabled={variables.length > 0}
          />
        </div>

        <VariablesTable variables={variables} />
      </div>
    </div>
  );
};

export default function VariablesNode({ data, isPanel = false, onSave }: VariablesNodeProps) {
  return isPanel ? <PanelContent data={data} onSave={onSave} /> : <NodeContent data={data} />;
}
