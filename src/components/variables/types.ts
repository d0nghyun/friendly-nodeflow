
import { NodeData } from "@/types/flow";

export interface Variable {
  name: string;
  type: string;
  source: string;
  value?: string;
  files?: string[];
}

export interface VariablesNodeProps {
  data: NodeData;
  isPanel?: boolean;
  onSave?: (data: NodeData) => void;
}

export interface PanelContentProps {
  data: NodeData;
  onSave?: (data: NodeData) => void;
}
