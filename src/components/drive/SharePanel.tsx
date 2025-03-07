
import { Globe, Link, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

interface SharePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPublic?: boolean;
  onPublicChange?: (value: boolean) => void;
}

export const SharePanel = ({ 
  open, 
  onOpenChange,
  isPublic = false,
  onPublicChange = () => {}
}: SharePanelProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 border-l bg-white p-4 shadow-lg transform transition-transform z-50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Share</h3>
        <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Public access</label>
            <Switch checked={isPublic} onCheckedChange={onPublicChange} />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Globe className="h-4 w-4" />
            {isPublic ? "Anyone with the link can view" : "Only members can access"}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input placeholder="Add people or groups" />
            <Button>Invite</Button>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Members</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-gray-500">john@example.com</div>
                  </div>
                </div>
                <Select defaultValue="editor">
                  <SelectTrigger className="w-[110px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {isPublic && (
            <div>
              <h4 className="text-sm font-medium mb-2">Share link</h4>
              <div className="flex items-center gap-2">
                <Input value="https://example.com/share/xyz" readOnly />
                <Button variant="outline" size="icon">
                  <Link className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
