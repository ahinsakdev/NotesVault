import { apiClient } from "@/services/api/api-client";
import { API_ENDPOINTS } from "@/services/api/api-endpoints";

export type TagMutationResult = {
  updatedCount: number;
};

export type RenameTagInput = {
  name: string;
};

export async function renameTag(
  tagName: string,
  input: RenameTagInput,
): Promise<TagMutationResult> {
  const response = await apiClient.patch<TagMutationResult>(
    API_ENDPOINTS.tags.byName(tagName),
    input,
  );

  return response.data;
}

export async function deleteTag(
  tagName: string,
): Promise<TagMutationResult> {
  const response = await apiClient.delete<TagMutationResult>(
    API_ENDPOINTS.tags.byName(tagName),
  );

  return response.data;
}
