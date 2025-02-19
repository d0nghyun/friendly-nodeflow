
export interface Drive {
  id: string;
  name: string;
  description: string;
  owner: string;
  shared: boolean;
}

export interface FileItem {
  id: number;
  name: string;
  type: 'file' | 'folder';
  modified: string;
  owner: string;
  shared: boolean;
  public: boolean;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: 'editor' | 'viewer';
}
