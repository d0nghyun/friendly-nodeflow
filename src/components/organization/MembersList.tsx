
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { OrganizationMember } from '@/types/organization';

interface MembersListProps {
  members: OrganizationMember[];
  canInvite: boolean;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

export const MembersList = ({ members, canInvite, searchQuery, onSearchChange }: MembersListProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Members</h2>
          <p className="text-sm text-gray-500">Manage organization members</p>
        </div>
        <Button disabled={!canInvite} className="gap-2">
          <Plus className="h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <div className="space-y-4">
        {members.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={member.avatarUrl} />
                <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{member.name}</div>
                <div className="text-sm text-gray-500">{member.email}</div>
              </div>
            </div>
            <div className="text-sm font-medium capitalize">{member.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
