
import { ChevronLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ExplorerHeaderProps {
  driveName: string;
  onBack: () => void;
}

export const ExplorerHeader = ({ driveName, onBack }: ExplorerHeaderProps) => {
  return (
    <div className="border-b bg-white p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">{driveName}</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search files..." className="pl-8" />
          </div>
        </div>
      </div>
    </div>
  );
};
