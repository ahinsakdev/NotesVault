import { AppearanceSettings } from "../components/appearance-settings";
import { EditorSettings } from "../components/editor-settings";
import { NoteSettings } from "../components/note-settings";
import { ProfileSettings } from "../components/profile-settings";
import { ReadingSettings } from "../components/reading-settings";
import { SecuritySettings } from "../components/security-settings";

export function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-5">
      <header>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Workspace
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-foreground">
          Settings
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your NotesVault experience, preferences, and account.
        </p>
      </header>

      <ProfileSettings />
      <AppearanceSettings />
      <ReadingSettings />
      <EditorSettings />
      <NoteSettings />
      <SecuritySettings />
    </div>
  );
}
