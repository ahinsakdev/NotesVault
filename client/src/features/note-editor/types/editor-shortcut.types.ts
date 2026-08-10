export type EditorShortcutGroupId =
  | "general"
  | "formatting"
  | "blocks"
  | "history"
  | "media";

export type EditorShortcut = {
  id: string;
  groupId: EditorShortcutGroupId;
  label: string;
  description: string;
  keywords: string[];
  macKeys: string[];
  windowsKeys: string[];
};

export type EditorShortcutGroup = {
  id: EditorShortcutGroupId;
  label: string;
};
