import { Folder, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DEFAULT_NOTE_FOLDER } from "@/features/folders/constants/folder.constants";
import { useFolders } from "@/features/folders/hooks/use-folders";

import { useNotePreferences } from "../hooks/use-note-preferences";
import { SettingsSection } from "./settings-section";

export function NoteSettings() {
  const foldersQuery = useFolders();

  const {
    preferences,
    resetPreferences,
    setDefaultFolderId,
  } = useNotePreferences();

  const defaultFolderExists =
    !preferences.defaultFolderId ||
    (foldersQuery.data ?? []).some(
      (folder) => folder.id === preferences.defaultFolderId,
    );

  const selectedFolderId = defaultFolderExists
    ? preferences.defaultFolderId
    : "";

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

          <div className="max-w-xs">
            <select
              className="h-9 w-full border border-input bg-background px-3 text-xs text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={foldersQuery.isLoading}
              id="default-note-folder"
              onChange={(event) =>
                setDefaultFolderId(event.target.value)
              }
              value={selectedFolderId}
            >
              <option value="">{DEFAULT_NOTE_FOLDER}</option>

              {(foldersQuery.data ?? []).map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>

            {foldersQuery.isError ? (
              <p className="mt-1.5 text-[10px] text-danger">
                Unable to load folders.
              </p>
            ) : null}
          </div>
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
