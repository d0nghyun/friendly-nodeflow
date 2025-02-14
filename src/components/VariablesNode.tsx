import { memo } from 'react';
import { NodeData } from '../types/flow';
import NodeHeader from './NodeHeader';

interface VariablesNodeProps {
  data: NodeData;
  isPanel?: boolean;
}

const VariablesNode = memo(({ data, isPanel = false }: VariablesNodeProps) => {
  if (!isPanel) {
    return <NodeHeader data={data} type="variablesNode" />;
  }

  // 패널에서 보여질 상세 내용
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">{data.label}</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">System Variables</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(data.variables?.system || {}).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <span className="text-sm font-medium">{key}:</span>
                <span className="text-sm text-gray-500">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Global Variables</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(data.variables?.global || {}).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <span className="text-sm font-medium">{key}:</span>
                <span className="text-sm text-gray-500">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

VariablesNode.displayName = 'VariablesNode';

export default VariablesNode;
