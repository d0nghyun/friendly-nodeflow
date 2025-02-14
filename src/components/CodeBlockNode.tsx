import { memo } from 'react';
import { NodeData } from '../types/flow';
import NodeHeader from './NodeHeader';
import { Handle, Position } from '@xyflow/react';
import { useState, useCallback } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CodeBlockNodeProps {
  data: NodeData;
  isPanel?: boolean;
}

const CodeBlockNode = memo(({ data, isPanel = false }: CodeBlockNodeProps) => {
  const [code, setCode] = useState('');
  const [outputVariables, setOutputVariables] = useState(data.outputVariables || []);
  const [newVariableName, setNewVariableName] = useState('');
  const [newVariableType, setNewVariableType] = useState('string');

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const addOutputVariable = useCallback(() => {
    if (newVariableName && newVariableType) {
      setOutputVariables(prev => [...prev, { name: newVariableName, type: newVariableType }]);
      setNewVariableName('');
      setNewVariableType('string');
    }
  }, [newVariableName, newVariableType, setOutputVariables]);

  const removeOutputVariable = useCallback((index: number) => {
    setOutputVariables(prev => prev.filter((_, i) => i !== index));
  }, [setOutputVariables]);

  if (!isPanel) {
    return <NodeHeader data={data} type="codeBlockNode" />;
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">{data.label}</h3>
      <div>
        <Label htmlFor="code" className="block text-sm font-medium text-gray-700">Code</Label>
        <Textarea
          id="code"
          value={code}
          onChange={handleCodeChange}
          rows={4}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div className="mt-4">
        <h4 className="font-medium mb-2">Output Variables</h4>
        <ul>
          {outputVariables.map((variable, index) => (
            <li key={index} className="flex items-center justify-between py-2 border-b border-gray-200">
              <span>{variable.name} ({variable.type})</span>
              <button
                onClick={() => removeOutputVariable(index)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex space-x-2">
          <Input
            type="text"
            placeholder="Variable Name"
            value={newVariableName}
            onChange={(e) => setNewVariableName(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
          <select
            value={newVariableType}
            onChange={(e) => setNewVariableType(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
          </select>
          <button
            onClick={addOutputVariable}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
});

CodeBlockNode.displayName = 'CodeBlockNode';

export default CodeBlockNode;
