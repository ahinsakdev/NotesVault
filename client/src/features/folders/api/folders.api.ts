import { apiClient } from "@/services/api/api-client";
import { API_ENDPOINTS } from "@/services/api/api-endpoints";

import type { Folder } from "../types/folder.types";

type FoldersResponse = {
  folders: Folder[];
};

type FolderResponse = {
  folder: Folder;
};

export type CreateFolderInput = {
  name: string;
};

export type UpdateFolderInput = {
  name: string;
};

export async function getFolders(): Promise<Folder[]> {
  const response = await apiClient.get<FoldersResponse>(
    API_ENDPOINTS.folders.list,
  );

  return response.data.folders;
}

export async function getFolderById(folderId: string): Promise<Folder> {
  const response = await apiClient.get<FolderResponse>(
    API_ENDPOINTS.folders.byId(folderId),
  );

  return response.data.folder;
}

export async function createFolder(
  input: CreateFolderInput,
): Promise<Folder> {
  const response = await apiClient.post<FolderResponse>(
    API_ENDPOINTS.folders.create,
    input,
  );

  return response.data.folder;
}

export async function updateFolder(
  folderId: string,
  input: UpdateFolderInput,
): Promise<Folder> {
  const response = await apiClient.patch<FolderResponse>(
    API_ENDPOINTS.folders.byId(folderId),
    input,
  );

  return response.data.folder;
}

export async function deleteFolder(folderId: string): Promise<void> {
  await apiClient.delete(API_ENDPOINTS.folders.byId(folderId));
}
