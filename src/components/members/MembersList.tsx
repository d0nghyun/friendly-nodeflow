
import { User, UserPlus, UserCheck } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  joinedAt: string;
}

interface MembersListProps {
  members: Member[];
  userRole: string;
  containerType: 'organization' | 'workspace' | 'drive';
  onRoleChange?: (memberId: string, newRole: string) => void;
  onInviteMember?: (email: string) => void;
}

export const MembersList = ({
  members,
  userRole,
  containerType,
  onRoleChange,
  onInviteMember,
}: MembersListProps) => {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const isOwner = userRole === "owner";
  const isAdmin = userRole === "admin" || isOwner;
  const canEditRoles = isAdmin && containerType === 'organization';

  const handleInvite = () => {
    onInviteMember?.(inviteEmail);
    setInviteEmail("");
    setShowInviteDialog(false);
  };

  const getAvailableRoles = () => {
    switch (containerType) {
      case 'organization':
        return [
          { value: 'admin', label: 'Admin' },
          { value: 'member', label: 'Member' }
        ];
      case 'workspace':
        return [
          { value: 'admin', label: 'Admin' },
          { value: 'member', label: 'Member' }
        ];
      case 'drive':
        return [
          { value: 'editor', label: 'Editor' },
          { value: 'viewer', label: 'Viewer' }
        ];
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{containerType.charAt(0).toUpperCase() + containerType.slice(1)} Members</h2>
        {isAdmin && (
          <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Member</DialogTitle>
                <DialogDescription>
                  Enter the email address of the person you want to invite.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input
                  placeholder="Email address"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleInvite}>
                    Send Invitation
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {containerType === 'drive' ? (
        <div className="space-y-4">
          {members.map(member => (
            <div 
              key={member.id} 
              className="flex items-center justify-between p-4 border rounded-lg bg-white"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-gray-500">{member.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-sm">
                  <UserCheck className="h-4 w-4 text-gray-400" />
                  {member.role}
                </span>
                <span className="text-sm text-gray-500">
                  Joined {member.joinedAt}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  {member.role === "owner" ? (
                    <span className="capitalize">Owner</span>
                  ) : canEditRoles ? (
                    <Select
                      value={member.role}
                      onValueChange={(value) => onRoleChange?.(member.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableRoles().map(role => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <span className="capitalize">{member.role}</span>
                  )}
                </TableCell>
                <TableCell>{member.joinedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
