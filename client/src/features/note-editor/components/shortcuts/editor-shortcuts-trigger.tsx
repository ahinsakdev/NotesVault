import { Keyboard } from "lucide-react";

import { EditorToolbarButton } from "../toolbar/editor-toolbar-button";

type EditorShortcutsTriggerProps = {
  onClick: () => void;
};

export function EditorShortcutsTrigger({
  onClick,
}: EditorShortcutsTriggerProps) {
  return (
    <EditorToolbarButton
      icon={<Keyboard aria-hidden="true" className="size-3.5" />}
      label="Keyboard shortcuts (Cmd/Ctrl + /)"
      onClick={onClick}
    />
  );
}
