
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Path {
  id: string;
  name: string;
}

interface DriveBreadcrumbProps {
  paths: Path[];
  onNavigate: (pathId: string) => void;
}

export const DriveBreadcrumb = ({ paths, onNavigate }: DriveBreadcrumbProps) => {
  return (
    <div className="flex items-center gap-1 text-sm">
      {paths.map((path, index) => (
        <div key={path.id} className="flex items-center">
          <Button
            variant="ghost"
            className="h-auto p-1 hover:underline"
            onClick={() => onNavigate(path.id)}
          >
            {path.name}
          </Button>
          {index < paths.length - 1 && (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )}
        </div>
      ))}
    </div>
  );
};
