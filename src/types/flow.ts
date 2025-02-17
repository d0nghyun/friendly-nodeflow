
import { Node } from '@xyflow/react';

export interface Variable {
  name: string;
  type: string;
  value?: string;
}

export interface NodeData extends Record<string, unknown> {
  label: string;
  variables: {
    system: Record<string, unknown>;
    global: Record<string, unknown>;
  };
  inputVariables: Variable[];
  outputVariables: Variable[];
}

export interface SidebarItem {
  type: string;
  label: string;
  description: string;
  className: string;
}

export interface NodeProps {
  data: NodeData;
  isPanel?: boolean;
  onSave?: (data: NodeData) => void;
}

export type CustomNode = Node<NodeData>;
