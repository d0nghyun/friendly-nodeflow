
export type OrganizationRole = "owner" | "admin" | "member";

export interface Member {
  id: string;
  name: string;
  email: string;
  role: OrganizationRole;
  avatar?: string;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  members: Member[];
  drives: any[];
}

export interface OrganizationMember {
  id: string;
  name: string;
  email: string;
  role: OrganizationRole;
  joinedAt: string;
  avatarUrl?: string;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  owner: OrganizationMember;
  membersCount: number;
  createdAt: string;
  userRole: OrganizationRole;
}
