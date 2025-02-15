
import { CustomNode, SidebarItem } from '@/types/flow';

export const sidebarItems: SidebarItem[] = [
  {
    type: 'variablesNode',
    label: 'Variables',
    description: 'Node for managing variables',
    className: 'bg-blue-500'
  },
  {
    type: 'codeBlockNode',
    label: 'Code Block',
    description: 'Node for code execution',
    className: 'bg-green-500'
  },
  {
    type: 'loadNode',
    label: 'Load',
    description: 'Node for loading data',
    className: 'bg-purple-500'
  }
];

export const initialNodes: CustomNode[] = [
  {
    id: 'variables-1',
    type: 'variablesNode',
    position: { x: 100, y: 100 },
    data: {
      label: 'Variables',
      variables: {
        system: {},
        global: {}
      },
      inputVariables: [],
      outputVariables: []
    },
    className: 'shadow-lg rounded-lg border bg-blue-500'
  },
  {
    id: 'codeblock-1',
    type: 'codeBlockNode',
    position: { x: 400, y: 100 },
    data: {
      label: 'Code Block',
      variables: {
        system: {},
        global: {}
      },
      inputVariables: [],
      outputVariables: []
    },
    className: 'shadow-lg rounded-lg border bg-green-500'
  }
];
