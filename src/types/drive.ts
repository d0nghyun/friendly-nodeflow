
export interface Drive {
  id: string;
  name: string;
  description: string;
  shared: boolean;
  userRole: 'editor' | 'viewer';
  createdAt?: string;
  membersCount?: number;
}

export interface FileItem {
  id: number;
  name: string;
  type: 'file' | 'folder';
  modified: string;
  shared: boolean;
  public: boolean;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: 'editor' | 'viewer';
  joinedAt: string;
}
