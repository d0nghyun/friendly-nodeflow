import { memo } from 'react';
import { NodeData } from '../types/flow';
import NodeHeader from './NodeHeader';

interface LoadNodeProps {
  data: NodeData;
  isPanel?: boolean;
}

const LoadNode = memo(({ data, isPanel = false }: LoadNodeProps) => {
  if (!isPanel) {
    return <NodeHeader data={data} type="loadNode" />;
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">{data.label}</h3>
      <div>
        <h4 className="font-medium mb-2">Input Variables</h4>
        {data.inputVariables && data.inputVariables.length > 0 ? (
          <ul>
            {data.inputVariables.map((variable, index) => (
              <li key={index} className="mb-1">
                {variable.name} ({variable.type})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No input variables</p>
        )}
      </div>
      <div>
        <h4 className="font-medium mb-2">Output Variables</h4>
        {data.outputVariables && data.outputVariables.length > 0 ? (
          <ul>
            {data.outputVariables.map((variable, index) => (
              <li key={index} className="mb-1">
                {variable.name} ({variable.type})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No output variables</p>
        )}
      </div>
    </div>
  );
});

LoadNode.displayName = 'LoadNode';

export default LoadNode;
