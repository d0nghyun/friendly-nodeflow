
export interface Variable {
  name: string;
  type: string;
  value?: string;
}

export interface NodeData {
  label: string;
  variables?: Variable[];
  inputVariables?: Array<{
    name: string;
    type: string;
    value?: string;
  }>;
  outputVariables?: Array<{
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
