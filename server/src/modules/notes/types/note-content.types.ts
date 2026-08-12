export type NoteContentAttributes = Record<string, unknown>;

export type NoteContentNode = {
  type?: string;
  attrs?: NoteContentAttributes;
  content?: NoteContentNode[];
  marks?: NoteContentNode[];
  text?: string;
  [key: string]: unknown;
};

export type NoteContent = NoteContentNode;
