
export type OrganizationRole = "owner" | "admin" | "member";

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
