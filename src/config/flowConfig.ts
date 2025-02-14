
import { SidebarItem } from '../types/flow';

export const sidebarItems: SidebarItem[] = [
  { 
    type: 'start', 
    label: 'Start Node', 
    description: 'Define system and global variables',
    className: 'bg-blue-50 border-blue-200'
  },
  { 
    type: 'variablesNode', 
    label: 'Variable Node', 
    description: 'Select and configure variables',
    className: 'bg-green-50 border-green-200'
  },
  { 
    type: 'codeBlockNode', 
    label: 'Code Node', 
    description: 'Execute code with templates',
    className: 'bg-purple-50 border-purple-200'
  },
  { 
    type: 'loadNode', 
    label: 'Load Node', 
    description: 'Upload data to S3',
    className: 'bg-yellow-50 border-yellow-200'
  },
  { 
    type: 'end', 
    label: 'End Node', 
    description: 'Workflow completion',
    className: 'bg-red-50 border-red-200'
  }
];

export const initialNodes = [
  {
    id: 'start-1',
    type: 'default',
    data: { 
      label: 'Start',
      variables: {
        system: {},
        global: {}
      }
    },
    position: { x: 250, y: 50 },
    className: 'bg-blue-50 shadow-lg rounded-lg border border-blue-200'
  }
];
