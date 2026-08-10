export type ImageUploadStatus = "idle" | "uploading" | "success" | "error";

export type ImageUploadResult = {
  alt: string;
  src: string;
  title: string | null;
};

export type ImageUploadAdapter = (file: File) => Promise<ImageUploadResult>;
