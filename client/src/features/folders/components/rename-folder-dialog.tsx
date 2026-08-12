import { useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDialogFocus } from "@/hooks/use-dialog-focus";
import { useToast } from "@/hooks/use-toast";

import { useUpdateFolder } from "../hooks/use-update-folder";

type RenameFolderDialogProps = {
  folderId: string;
  folderName: string;
  isOpen: boolean;
  onClose: () => void;
};

const MAX_FOLDER_NAME_LENGTH = 100;

export function RenameFolderDialog({
  folderId,
  folderName,
  isOpen,
  onClose,
}: RenameFolderDialogProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState(folderName);
  const [error, setError] = useState("");

  const updateFolderMutation = useUpdateFolder();
  const { showToast } = useToast();

  function handleClose() {
    if (updateFolderMutation.isPending) {
      return;
    }

    onClose();
  }

  useDialogFocus({
    containerRef: dialogRef,
    initialFocusRef: inputRef,
    isOpen,
    onEscape: handleClose,
  });

  if (!isOpen) {
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (updateFolderMutation.isPending) {
      return;
    }

    const normalizedName = name.trim();

    if (!normalizedName) {
      setError("Enter a folder name.");
      inputRef.current?.focus();
      return;
    }

    if (normalizedName.length > MAX_FOLDER_NAME_LENGTH) {
      setError(
        `Folder name must be ${MAX_FOLDER_NAME_LENGTH} characters or fewer.`,
      );
      inputRef.current?.focus();
      return;
    }

    if (normalizedName === folderName) {
      onClose();
      return;
    }

    setError("");

    try {
      await updateFolderMutation.mutateAsync({
        folderId,
        input: {
          name: normalizedName,
        },
      });

      showToast({
        title: "Folder renamed",
        message: `Folder renamed to "${normalizedName}".`,
        variant: "success",
      });

      onClose();
    } catch {
      setError(
        "Unable to rename this folder. The name may already be in use.",
      );
      inputRef.current?.focus();
    }
  }

  return createPortal(
    <div
      aria-labelledby="rename-folder-title"
      aria-modal="true"
      className="notesvault-overlay-backdrop fixed inset-0 z-[110] flex items-center justify-center bg-black/45 px-4 py-8 backdrop-blur-[2px]"
      role="dialog"
    >
      <div
        className="notesvault-overlay-panel w-full max-w-md border border-border bg-card shadow-dialog"
        ref={dialogRef}
        tabIndex={-1}
      >
        <header className="border-b border-border px-5 py-4">
          <h2
            className="text-sm font-semibold text-foreground"
            id="rename-folder-title"
          >
            Rename folder
          </h2>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Choose a new name for this folder.
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="px-5 py-5">
            <Input
              autoComplete="off"
              error={error || undefined}
              label="Folder name"
              maxLength={MAX_FOLDER_NAME_LENGTH}
              onChange={(event) => {
                setName(event.target.value);

                if (error) {
                  setError("");
                }
              }}
              ref={inputRef}
              value={name}
            />
          </div>

          <footer className="flex items-center justify-end gap-2 border-t border-border px-5 py-4">
            <Button
              disabled={updateFolderMutation.isPending}
              onClick={handleClose}
              size="sm"
              variant="outline"
            >
              Cancel
            </Button>

            <Button
              isLoading={updateFolderMutation.isPending}
              loadingText="Renaming"
              size="sm"
              type="submit"
            >
              Rename
            </Button>
          </footer>
        </form>
      </div>
    </div>,
    document.body,
  );
}
