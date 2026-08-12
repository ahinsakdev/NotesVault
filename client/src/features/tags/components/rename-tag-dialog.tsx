import { useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDialogFocus } from "@/hooks/use-dialog-focus";
import { useToast } from "@/hooks/use-toast";

import { useRenameTag } from "../hooks/use-rename-tag";

type RenameTagDialogProps = {
  currentTagName: string;
  isOpen: boolean;
  onClose: () => void;
  onRenamed: (nextTagName: string) => void;
};

const MAX_TAG_LENGTH = 50;

export function RenameTagDialog({
  currentTagName,
  isOpen,
  onClose,
  onRenamed,
}: RenameTagDialogProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState(currentTagName);
  const [error, setError] = useState("");

  const renameTagMutation = useRenameTag();
  const { showToast } = useToast();

  function handleClose() {
    if (renameTagMutation.isPending) {
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

    if (renameTagMutation.isPending) {
      return;
    }

    const normalizedName = name.trim();

    if (!normalizedName) {
      setError("Enter a tag name.");
      inputRef.current?.focus();
      return;
    }

    if (normalizedName.length > MAX_TAG_LENGTH) {
      setError(
        `Tag name must be ${MAX_TAG_LENGTH} characters or fewer.`,
      );
      inputRef.current?.focus();
      return;
    }

    if (normalizedName === currentTagName) {
      onClose();
      return;
    }

    setError("");

    try {
      const result = await renameTagMutation.mutateAsync({
        tagName: currentTagName,
        input: {
          name: normalizedName,
        },
      });

      showToast({
        title: "Tag renamed",
        message: `Updated ${result.updatedCount} ${
          result.updatedCount === 1 ? "note" : "notes"
        }.`,
        variant: "success",
      });

      onRenamed(normalizedName);
    } catch {
      setError("Unable to rename this tag. Please try again.");
      inputRef.current?.focus();
    }
  }

  return createPortal(
    <div
      aria-labelledby="rename-tag-title"
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
            id="rename-tag-title"
          >
            Rename tag
          </h2>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            This will rename the tag across all of your notes.
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="px-5 py-5">
            <Input
              autoComplete="off"
              error={error || undefined}
              label="Tag name"
              maxLength={MAX_TAG_LENGTH}
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
              disabled={renameTagMutation.isPending}
              onClick={handleClose}
              size="sm"
              variant="outline"
            >
              Cancel
            </Button>

            <Button
              isLoading={renameTagMutation.isPending}
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
