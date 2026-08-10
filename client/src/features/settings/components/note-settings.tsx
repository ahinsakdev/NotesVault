import { Folder, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NOTE_FOLDER_OPTIONS,
  type NoteFolderOption,
} from "@/features/folders/constants/folder.constants";

import { useNotePreferences } from "../hooks/use-note-preferences";
import { SettingsSection } from "./settings-section";

export function NoteSettings() {
  const { preferences, resetPreferences, setDefaultFolder } =
    useNotePreferences();

  return (
    <SettingsSection
      description="Set defaults used when creating new notes."
      title="New notes"
    >
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-[minmax(0,0.75fr)_minmax(18rem,1fr)]">
          <div className="flex items-start gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center bg-surface-subtle text-muted-foreground">
              <Folder aria-hidden="true" className="size-3.5" />
            </span>

            <div>
              <label
                className="text-xs font-semibold text-foreground"
                htmlFor="default-note-folder"
              >
                Default folder
              </label>

              <p className="mt-1 max-w-xs text-[11px] leading-5 text-muted-foreground">
                Choose where newly created notes are placed by default.
              </p>
            </div>
          </div>

          <select
            className="h-9 w-full max-w-xs border border-input bg-background px-3 text-xs text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
            id="default-note-folder"
            onChange={(event) =>
              setDefaultFolder(event.target.value as NoteFolderOption)
            }
            value={preferences.defaultFolder}
          >
            {NOTE_FOLDER_OPTIONS.map((folder) => (
              <option key={folder} value={folder}>
                {folder}
              </option>
            ))}
          </select>
        </div>

        <div className="border-t border-border pt-5">
          <Button
            leftIcon={<RotateCcw className="size-3.5" />}
            onClick={resetPreferences}
            size="sm"
            variant="outline"
          >
            Reset note defaults
          </Button>
        </div>
      </div>
    </SettingsSection>
  );
}
