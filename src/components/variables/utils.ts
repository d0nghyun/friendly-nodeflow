
import { Variable } from "./types";
import { NodeData } from "@/types/flow";

export const arrayToRecord = (variables: Variable[]): Record<string, unknown> => {
  return variables.reduce((acc, variable) => ({
    ...acc,
    [variable.name]: variable
  }), {});
};

export const recordToArray = (record: Record<string, unknown>): Variable[] => {
  if (!record) return [];
  return Object.values(record).map(value => value as Variable);
};

export const getInitialVariables = (data: NodeData): Variable[] => {
  const systemVariables = data.variables?.system;
  if (Array.isArray(systemVariables)) {
    return systemVariables as Variable[];
  }
  return recordToArray(systemVariables as Record<string, unknown>);
};
