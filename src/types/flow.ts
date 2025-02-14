
export interface NodeData {
  label: string;
  variables?: {
    system: Record<string, unknown>;
    global: Record<string, unknown>;
  };
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
