import type { Editor } from "@tiptap/react";

import type {
  EditorCommandGroup as EditorCommandGroupId,
  EditorCommandItem as EditorCommandItemType,
} from "../types/editor-command.types";
import { EditorCommandItem } from "./editor-command-item";

const groupLabels: Record<EditorCommandGroupId, string> = {
  formatting: "Formatting",
  blocks: "Blocks",
  insert: "Insert",
  history: "History",
  help: "Help",
};

type EditorCommandGroupProps = {
  commands: EditorCommandItemType[];
  editor: Editor;
  group: EditorCommandGroupId;
  onSelect: (command: EditorCommandItemType) => void;
  selectedCommandId: string | null;
};

export function EditorCommandGroup({
  commands,
  editor,
  group,
  onSelect,
  selectedCommandId,
}: EditorCommandGroupProps) {
  if (commands.length === 0) {
    return null;
  }

  return (
    <section>
      <h3 className="notesvault-command-group-title">{groupLabels[group]}</h3>

      <div className="overflow-hidden border border-border">
        {commands.map((command) => {
          const isAvailable = command.isAvailable?.(editor) ?? true;

          return (
            <EditorCommandItem
              command={command}
              isAvailable={isAvailable}
              isSelected={command.id === selectedCommandId}
              key={command.id}
              onSelect={() => {
                if (isAvailable) {
                  onSelect(command);
                }
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
