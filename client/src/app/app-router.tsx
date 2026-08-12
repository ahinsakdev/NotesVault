import { lazy, Suspense, type ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router";

import { ROUTES } from "@/app/routes";
import { AppLayout } from "@/components/layout/app-layout";
import { RouteLoadingFallback } from "@/components/ui/route-loading-fallback";
import { AuthLayout } from "@/features/authentication/components/auth-layout";
import { AuthenticatedRoute } from "@/features/authentication/components/route-guards/authenticated-route";
import { GuestRoute } from "@/features/authentication/components/route-guards/guest-route";
import { NoteEditorPageSkeleton } from "@/features/note-editor/components/note-editor-page-skeleton";

import { NotFoundPage } from "./pages/not-found-page";

const LoginPage = lazy(() =>
  import("@/features/authentication/pages/login-page").then((module) => ({
    default: module.LoginPage,
  })),
);

const SignupPage = lazy(() =>
  import("@/features/authentication/pages/signup-page").then((module) => ({
    default: module.SignupPage,
  })),
);

const ForgotPasswordPage = lazy(() =>
  import("@/features/authentication/pages/forgot-password-page").then(
    (module) => ({
      default: module.ForgotPasswordPage,
    }),
  ),
);

const ResetPasswordPage = lazy(() =>
  import("@/features/authentication/pages/reset-password-page").then(
    (module) => ({
      default: module.ResetPasswordPage,
    }),
  ),
);

const DashboardPage = lazy(() =>
  import("@/features/dashboard/pages/dashboard-page").then((module) => ({
    default: module.DashboardPage,
  })),
);

const NotesPage = lazy(() =>
  import("@/features/notes/pages/notes-page").then((module) => ({
    default: module.NotesPage,
  })),
);

const NoteDetailsPage = lazy(() =>
  import("@/features/notes/pages/note-details-page").then((module) => ({
    default: module.NoteDetailsPage,
  })),
);

const NoteReadPage = lazy(() =>
  import("@/features/notes/pages/note-read-page").then((module) => ({
    default: module.NoteReadPage,
  })),
);

const RecentNotesPage = lazy(() =>
  import("@/features/notes/pages/recent-notes-page").then((module) => ({
    default: module.RecentNotesPage,
  })),
);

const FavoritesPage = lazy(() =>
  import("@/features/notes/pages/favorites-page").then((module) => ({
    default: module.FavoritesPage,
  })),
);

const ArchivedNotesPage = lazy(() =>
  import("@/features/notes/pages/archived-notes-page").then((module) => ({
    default: module.ArchivedNotesPage,
  })),
);

const PinnedNotesPage = lazy(() =>
  import("@/features/notes/pages/pinned-notes-page").then((module) => ({
    default: module.PinnedNotesPage,
  })),
);

const FoldersPage = lazy(() =>
  import("@/features/folders/pages/folders-page").then((module) => ({
    default: module.FoldersPage,
  })),
);

const FolderDetailsPage = lazy(() =>
  import("@/features/folders/pages/folder-details-page").then((module) => ({
    default: module.FolderDetailsPage,
  })),
);

const TagsPage = lazy(() =>
  import("@/features/tags/pages/tags-page").then((module) => ({
    default: module.TagsPage,
  })),
);

const TagDetailsPage = lazy(() =>
  import("@/features/tags/pages/tag-details-page").then((module) => ({
    default: module.TagDetailsPage,
  })),
);

const SearchPage = lazy(() =>
  import("@/features/search/pages/search-page").then((module) => ({
    default: module.SearchPage,
  })),
);

const TrashPage = lazy(() =>
  import("@/features/trash/pages/trash-page").then((module) => ({
    default: module.TrashPage,
  })),
);

const SettingsPage = lazy(() =>
  import("@/features/settings/pages/settings-page").then((module) => ({
    default: module.SettingsPage,
  })),
);

const TermsPage = lazy(() =>
  import("@/features/authentication/pages/terms-page").then((module) => ({
    default: module.TermsPage,
  })),
);

const PrivacyPage = lazy(() =>
  import("@/features/authentication/pages/privacy-page").then((module) => ({
    default: module.PrivacyPage,
  })),
);

type RouteSuspenseProps = {
  children: ReactNode;
};

function RouteSuspense({ children }: RouteSuspenseProps) {
  return <Suspense fallback={<RouteLoadingFallback />}>{children}</Suspense>;
}

export function AppRouter() {
  return (
    <Routes>
      <Route element={<Navigate replace to={ROUTES.dashboard} />} path="/" />

      <Route element={<AuthLayout />}>
        <Route element={<GuestRoute />}>
          <Route
            element={
              <RouteSuspense>
                <LoginPage />
              </RouteSuspense>
            }
            path="login"
          />

          <Route
            element={
              <RouteSuspense>
                <SignupPage />
              </RouteSuspense>
            }
            path="signup"
          />

          <Route
            element={
              <RouteSuspense>
                <ForgotPasswordPage />
              </RouteSuspense>
            }
            path="forgot-password"
          />
        </Route>

        <Route
          element={
            <RouteSuspense>
              <ResetPasswordPage />
            </RouteSuspense>
          }
          path="reset-password/:token"
        />

        <Route
          element={
            <RouteSuspense>
              <TermsPage />
            </RouteSuspense>
          }
          path="terms"
        />

        <Route
          element={
            <RouteSuspense>
              <PrivacyPage />
            </RouteSuspense>
          }
          path="privacy"
        />
      </Route>

      <Route element={<AuthenticatedRoute />}>
        <Route element={<AppLayout />} path="app">
          <Route element={<Navigate replace to="dashboard" />} index />

          <Route
            element={
              <RouteSuspense>
                <DashboardPage />
              </RouteSuspense>
            }
            path="dashboard"
          />

          <Route
            element={
              <RouteSuspense>
                <NotesPage />
              </RouteSuspense>
            }
            path="notes"
          />

          <Route
            element={
              <Suspense fallback={<NoteEditorPageSkeleton />}>
                <NoteReadPage />
              </Suspense>
            }
            path="notes/:noteId/read"
          />

          <Route
            element={
              <Suspense fallback={<NoteEditorPageSkeleton />}>
                <NoteDetailsPage />
              </Suspense>
            }
            path="notes/:noteId"
          />

          <Route
            element={
              <RouteSuspense>
                <RecentNotesPage />
              </RouteSuspense>
            }
            path="recent"
          />

          <Route
            element={
              <RouteSuspense>
                <FavoritesPage />
              </RouteSuspense>
            }
            path="favorites"
          />

          <Route
            element={
              <RouteSuspense>
                <PinnedNotesPage />
              </RouteSuspense>
            }
            path="pinned"
          />

          <Route
            element={
              <RouteSuspense>
                <ArchivedNotesPage />
              </RouteSuspense>
            }
            path="archived"
          />

          <Route
            element={
              <RouteSuspense>
                <FoldersPage />
              </RouteSuspense>
            }
            path="folders"
          />

          <Route
            element={
              <RouteSuspense>
                <FolderDetailsPage />
              </RouteSuspense>
            }
            path="folders/:folderId"
          />

          <Route
            element={
              <RouteSuspense>
                <TagsPage />
              </RouteSuspense>
            }
            path="tags"
          />

          <Route
            element={
              <RouteSuspense>
                <TagDetailsPage />
              </RouteSuspense>
            }
            path="tags/:tagId"
          />

          <Route
            element={
              <RouteSuspense>
                <SearchPage />
              </RouteSuspense>
            }
            path="search"
          />

          <Route
            element={
              <RouteSuspense>
                <TrashPage />
              </RouteSuspense>
            }
            path="trash"
          />

          <Route
            element={
              <RouteSuspense>
                <SettingsPage />
              </RouteSuspense>
            }
            path="settings"
          />
        </Route>
      </Route>

      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
}
