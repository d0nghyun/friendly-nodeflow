
import { useState } from "react";
import { User, UserPlus, UserCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const canEditRoles = isAdmin && containerType !== 'drive';

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

  const handleRoleChange = (memberId: string, newRole: string) => {
    onRoleChange?.(memberId, newRole);
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
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-gray-400" />
                {containerType === 'organization' && member.role === 'owner' ? (
                  <span className="text-sm font-medium">Owner</span>
                ) : (
                  <Select
                    value={member.role}
                    onValueChange={(value) => handleRoleChange(member.id, value)}
                    disabled={!canEditRoles || (containerType === 'organization' && member.role === 'owner')}
                  >
                    <SelectTrigger className="w-[110px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableRoles()?.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              <span className="text-sm text-gray-500">
                Joined {member.joinedAt}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
