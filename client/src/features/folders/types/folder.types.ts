export type Folder = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type FolderSummary = {
  id: string;
  name: string;
  noteCount: number;
  createdAt?: string;
  updatedAt: string;
};
