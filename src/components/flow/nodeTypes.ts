
import VariablesNode from '../VariablesNode';
import CodeBlockNode from '../CodeBlockNode';
import LoadNode from '../LoadNode';

export const nodeTypes = {
  variablesNode: VariablesNode,
  codeBlockNode: CodeBlockNode,
  loadNode: LoadNode
} as const;

export type NodeTypes = typeof nodeTypes;
