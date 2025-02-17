
import { Node } from '@xyflow/react';

export interface Variable {
  name: string;
  type: string;
  value?: string;
  source?: string;
  files?: string[];
  isEnvironment?: boolean;
  isExternal?: boolean;
}

export interface NodeData extends Record<string, unknown> {
  label: string;
  nodeType?: 'start' | 'variable' | 'code' | 'upload' | 'end';
  variables: {
    system: Record<string, unknown>;
    global: Record<string, unknown>;
  };
  inputVariables: Variable[];
  outputVariables: Variable[];
  environmentVariables?: Variable[];
  externalVariables?: Variable[];
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
