import { Pencil, Tag, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";

import { ROUTES } from "@/app/routes";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { NotesCollectionPage } from "@/features/notes/components/notes-collection-page";
import { useNotes } from "@/features/notes/hooks/use-notes";
import { useToast } from "@/hooks/use-toast";

import { RenameTagDialog } from "../components/rename-tag-dialog";
import { useDeleteTag } from "../hooks/use-delete-tag";

export function TagDetailsPage() {
  const { tagId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: notes = [], isError, isLoading, refetch } = useNotes();
  const deleteTagMutation = useDeleteTag();

  const decodedTag = useMemo(() => {
    if (!tagId) {
      return null;
    }

    try {
      return decodeURIComponent(tagId);
    } catch {
      return null;
    }
  }, [tagId]);

  const activeNotes = useMemo(
    () => notes.filter((note) => !note.deletedAt && !note.isArchived),
    [notes],
  );

  const tagNotes = useMemo(() => {
    if (!decodedTag) {
      return [];
    }

    const normalizedTag = decodedTag.toLocaleLowerCase();

    return activeNotes.filter((note) =>
      note.tags.some(
        (tag) => tag.toLocaleLowerCase() === normalizedTag,
      ),
    );
  }, [activeNotes, decodedTag]);

  const tagExists = useMemo(() => {
    if (!decodedTag) {
      return false;
    }

    const normalizedTag = decodedTag.toLocaleLowerCase();

    return activeNotes.some((note) =>
      note.tags.some(
        (tag) => tag.toLocaleLowerCase() === normalizedTag,
      ),
    );
  }, [activeNotes, decodedTag]);

  if (!isLoading && !isError && !tagExists) {
    return <Navigate replace to={ROUTES.tags} />;
  }

  async function handleDeleteTag() {
    if (!decodedTag || deleteTagMutation.isPending) {
      return;
    }

    try {
      const result = await deleteTagMutation.mutateAsync(decodedTag);

      showToast({
        title: "Tag deleted",
        message: `Removed from ${result.updatedCount} ${
          result.updatedCount === 1 ? "note" : "notes"
        }.`,
        variant: "success",
      });

      navigate(ROUTES.tags, {
        replace: true,
      });
    } catch {
      setIsDeleteDialogOpen(false);

      showToast({
        title: "Unable to delete tag",
        message: "The tag could not be deleted. Please try again.",
        variant: "error",
      });
    }
  }

  function handleRenamed(nextTagName: string) {
    setIsRenameDialogOpen(false);

    navigate(
      ROUTES.tag.replace(
        ":tagId",
        encodeURIComponent(nextTagName),
      ),
      {
        replace: true,
      },
    );
  }

  return (
    <>
      <NotesCollectionPage
        actions={
          decodedTag ? (
            <>
              <Button
                leftIcon={<Pencil className="size-3.5" />}
                onClick={() => setIsRenameDialogOpen(true)}
                size="sm"
                variant="outline"
              >
                Rename
              </Button>

              <Button
                leftIcon={<Trash2 className="size-3.5" />}
                onClick={() => setIsDeleteDialogOpen(true)}
                size="sm"
                variant="outline"
              >
                Delete
              </Button>
            </>
          ) : null
        }
        description={
          decodedTag
            ? `Browse notes classified with the ${decodedTag} tag.`
            : "Loading tagged notes."
        }
        emptyDescription="Notes using this tag will appear here."
        emptyIcon={Tag}
        emptyTitle="No notes with this tag"
        isError={isError}
        isLoading={isLoading}
        notes={tagNotes}
        onRetry={() => {
          void refetch();
        }}
        title={decodedTag ?? "Tag"}
      />

      {decodedTag ? (
        <RenameTagDialog
          currentTagName={decodedTag}
          isOpen={isRenameDialogOpen}
          key={`${decodedTag}:${isRenameDialogOpen}`}
          onClose={() => setIsRenameDialogOpen(false)}
          onRenamed={handleRenamed}
        />
      ) : null}

      <ConfirmDialog
        cancelLabel="Cancel"
        confirmLabel="Delete tag"
        description={
          decodedTag
            ? `The "${decodedTag}" tag will be removed from all of your notes. Your notes will not be deleted.`
            : "This tag will be removed from your notes."
        }
        isOpen={isDeleteDialogOpen}
        onCancel={() => {
          if (!deleteTagMutation.isPending) {
            setIsDeleteDialogOpen(false);
          }
        }}
        onConfirm={() => {
          void handleDeleteTag();
        }}
        title="Delete tag?"
        variant="danger"
      />
    </>
  );
}
