
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Variable } from "./types";

interface VariablesTableProps {
  variables: Variable[];
}

export const VariablesTable = ({ variables }: VariablesTableProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs">Name</TableHead>
            <TableHead className="text-xs">Type</TableHead>
            <TableHead className="text-xs">Value/Files</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variables.map((variable, index) => (
            <TableRow key={index}>
              <TableCell className="text-xs font-medium">{variable.name}</TableCell>
              <TableCell className="text-xs">{variable.type}</TableCell>
              <TableCell className="text-xs text-gray-500">
                {variable.type === "String" 
                  ? variable.value 
                  : variable.files?.join(", ") || "No files selected"}
              </TableCell>
            </TableRow>
          ))}
          {variables.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-xs text-center text-gray-500 py-4">
                No variables added yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
