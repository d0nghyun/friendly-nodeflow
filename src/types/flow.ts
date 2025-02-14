
import { Node } from '@xyflow/react';

export interface Variable {
  name: string;
  type: string;
  value?: string;
}

export interface NodeData extends Record<string, any> {
  label: string;
  variables: Variable[];
  inputVariables: Array<{
    name: string;
    type: string;
    value?: string;
  }>;
  outputVariables: Array<{
    name: string;
    type: string;
  }>;
}

export interface SidebarItem {
  type: string;
  label: string;
  description: string;
  className: string;
}

export type CustomNode = Node<NodeData>;
