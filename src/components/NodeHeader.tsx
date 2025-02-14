
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { NodeData } from '../types/flow';

interface NodeHeaderProps {
  data: NodeData;
  type: string;
}

const NodeHeader = memo(({ data, type }: NodeHeaderProps) => {
  return (
    <div className="p-2 min-w-[150px]">
      {type === 'variablesNode' && (
        <>
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </>
      )}
      
      {type === 'codeBlockNode' && (
        <>
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </>
      )}
      
      {type === 'loadNode' && (
        <Handle type="target" position={Position.Left} />
      )}
      
      <div className="text-sm font-medium">{data.label}</div>
    </div>
  );
});

NodeHeader.displayName = 'NodeHeader';

export default NodeHeader;
