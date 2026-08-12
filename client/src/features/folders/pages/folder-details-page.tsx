import { Pencil, Trash2, Folder } from "lucide-react";
import { useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";

import { ROUTES } from "@/app/routes";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Button } from "@/components/ui/button";
import { NotesCollectionPage } from "@/features/notes/components/notes-collection-page";
import { useNotes } from "@/features/notes/hooks/use-notes";
import { notesQueryKeys } from "@/features/notes/hooks/use-notes";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

import { RenameFolderDialog } from "../components/rename-folder-dialog";
import { useDeleteFolder } from "../hooks/use-delete-folder";
import { useFolder } from "../hooks/use-folder";

export function FolderDetailsPage() {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const folderQuery = useFolder(folderId ?? "");
  const notesQuery = useNotes();
  const deleteFolderMutation = useDeleteFolder();

  const folderNotes = useMemo(() => {
    if (!folderId) {
      return [];
    }

    return (notesQuery.data ?? []).filter(
      (note) =>
        note.folderId === folderId &&
        !note.deletedAt &&
        !note.isArchived,
    );
  }, [folderId, notesQuery.data]);

  if (!folderId) {
    return <Navigate replace to={ROUTES.folders} />;
  }

  if (!folderQuery.isLoading && folderQuery.isError) {
    return <Navigate replace to={ROUTES.folders} />;
  }

  const isLoading =
    folderQuery.isLoading || notesQuery.isLoading;

  const isError =
    !folderQuery.isError && notesQuery.isError;

  async function handleDeleteFolder() {
    if (deleteFolderMutation.isPending) {
      return;
    }

    try {
      const currentFolderId = folderQuery.data?.id;

      if (!currentFolderId) {
        return;
      }

      await deleteFolderMutation.mutateAsync(currentFolderId);

      await queryClient.invalidateQueries({
        queryKey: notesQueryKeys.all,
      });

      showToast({
        title: "Folder deleted",
        message: "Its notes were moved to Unfiled.",
        variant: "success",
      });

      navigate(ROUTES.folders, {
        replace: true,
      });
    } catch {
      setIsDeleteDialogOpen(false);

      showToast({
        title: "Unable to delete folder",
        message: "The folder could not be deleted. Please try again.",
        variant: "error",
      });
    }
  }

  return (
    <>
      <NotesCollectionPage
        actions={
          folderQuery.data ? (
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
          folderQuery.data
            ? `Browse and manage notes organized inside ${folderQuery.data.name}.`
            : "Loading folder notes."
        }
        emptyDescription="Notes assigned to this folder will appear here."
        emptyIcon={Folder}
        emptyTitle="No notes in this folder"
        isError={isError}
        isLoading={isLoading}
        notes={folderNotes}
        onRetry={() => {
          void Promise.all([
            folderQuery.refetch(),
            notesQuery.refetch(),
          ]);
        }}
        title={folderQuery.data?.name ?? "Folder"}
      />

      {folderQuery.data ? (
        <RenameFolderDialog
          folderId={folderQuery.data.id}
          folderName={folderQuery.data.name}
          isOpen={isRenameDialogOpen}
          key={`${folderQuery.data.id}:${folderQuery.data.name}:${isRenameDialogOpen}`}
          onClose={() => setIsRenameDialogOpen(false)}
        />
      ) : null}

      <ConfirmDialog
        cancelLabel="Cancel"
        confirmLabel="Delete folder"
        description="This folder will be deleted. Notes inside it will be moved to Unfiled and will not be deleted."
        isOpen={isDeleteDialogOpen}
        onCancel={() => {
          if (!deleteFolderMutation.isPending) {
            setIsDeleteDialogOpen(false);
          }
        }}
        onConfirm={() => {
          void handleDeleteFolder();
        }}
        title="Delete folder?"
        variant="danger"
      />
    </>
  );
}
