
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MembersList } from "@/components/members/MembersList";
import type { Member } from "@/types/drive";

interface DriveMembersProps {
  members: Member[];
  canInviteMembers: boolean;
  canManageRoles: boolean;
  showInviteDialog: boolean;
  inviteEmail: string;
  onInviteEmailChange: (email: string) => void;
  onShowInviteDialogChange: (show: boolean) => void;
  onInviteMember: () => void;
  onRoleChange: (memberId: string, newRole: string) => void;
}

export const DriveMembers = ({
  members,
  canInviteMembers,
  canManageRoles,
  showInviteDialog,
  inviteEmail,
  onInviteEmailChange,
  onShowInviteDialogChange,
  onInviteMember,
  onRoleChange,
}: DriveMembersProps) => {
  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Members</h2>
        <Dialog open={showInviteDialog} onOpenChange={onShowInviteDialogChange}>
          <DialogTrigger asChild>
            <Button disabled={!canInviteMembers} className="gap-2">
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
                onChange={(e) => onInviteEmailChange(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => onShowInviteDialogChange(false)}>
                  Cancel
                </Button>
                <Button onClick={onInviteMember}>
                  Send Invitation
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <MembersList
        members={members}
        userRole="editor"
        containerType="drive"
        onRoleChange={onRoleChange}
      />
    </>
  );
};
