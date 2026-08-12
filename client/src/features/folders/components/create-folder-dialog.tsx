import { useCallback, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDialogFocus } from "@/hooks/use-dialog-focus";
import { useToast } from "@/hooks/use-toast";

import { useCreateFolder } from "../hooks/use-create-folder";

type CreateFolderDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MAX_FOLDER_NAME_LENGTH = 100;

export function CreateFolderDialog({
  isOpen,
  onClose,
}: CreateFolderDialogProps) {
  const dialogRef = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const createFolderMutation = useCreateFolder();
  const { showToast } = useToast();

  const handleClose = useCallback(() => {
    if (createFolderMutation.isPending) {
      return;
    }

    setName("");
    setError("");
    createFolderMutation.reset();
    onClose();
  }, [createFolderMutation, onClose]);

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

    if (createFolderMutation.isPending) {
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

    setError("");

    try {
      await createFolderMutation.mutateAsync({
        name: normalizedName,
      });

      showToast({
        title: "Folder created",
        message: `"${normalizedName}" is ready for your notes.`,
        variant: "success",
      });

      handleClose();
    } catch {
      setError(
        "Unable to create this folder. The name may already be in use.",
      );
      inputRef.current?.focus();
    }
  }

  return createPortal(
    <div
      aria-labelledby="create-folder-title"
      aria-modal="true"
      className="notesvault-overlay-backdrop fixed inset-0 z-[110] flex items-center justify-center bg-black/35 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
      role="dialog"
    >
      <form
        className="notesvault-overlay-panel w-full max-w-md border border-border bg-card shadow-card"
        onSubmit={handleSubmit}
        ref={dialogRef}
        tabIndex={-1}
      >
        <header className="border-b border-border px-5 py-4">
          <h2
            className="text-sm font-semibold text-foreground"
            id="create-folder-title"
          >
            New folder
          </h2>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Create a folder to organize related notes.
          </p>
        </header>

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
            placeholder="e.g. Projects"
            ref={inputRef}
            value={name}
          />
        </div>

        <footer className="flex justify-end gap-2 border-t border-border px-5 py-4">
          <Button
            disabled={createFolderMutation.isPending}
            onClick={handleClose}
            size="sm"
            type="button"
            variant="outline"
          >
            Cancel
          </Button>

          <Button
            isLoading={createFolderMutation.isPending}
            loadingText="Creating"
            size="sm"
            type="submit"
          >
            Create folder
          </Button>
        </footer>
      </form>
    </div>,
    document.body,
  );
}
