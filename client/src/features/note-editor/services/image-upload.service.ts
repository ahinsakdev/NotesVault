import type {
  ImageUploadAdapter,
  ImageUploadResult,
} from "../types/image-upload.types";
import {
  readImageFileAsDataUrl,
  validateImageFile,
} from "../utils/image-file.utils";

function getImageAltFromFileName(fileName: string): string {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();
}

export const uploadImageLocally: ImageUploadAdapter = async (
  file,
): Promise<ImageUploadResult> => {
  const validationMessage = validateImageFile(file);

  if (validationMessage) {
    throw new Error(validationMessage);
  }

  const src = await readImageFileAsDataUrl(file);

  return {
    alt: getImageAltFromFileName(file.name) || "Inserted image",
    src,
    title: file.name,
  };
};

export const imageUploadAdapter = uploadImageLocally;
