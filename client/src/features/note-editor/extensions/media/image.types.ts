export type ImageAlignment = "left" | "center" | "right";

export type NotesVaultImageAttributes = {
  align: ImageAlignment;
  alt: string;
  caption: string;
  src: string;
  title: string | null;
  width: number;
};
