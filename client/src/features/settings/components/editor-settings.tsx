import { Check, RotateCcw, SpellCheck2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

import { useEditorPreferences } from "../hooks/use-editor-preferences";
import { SettingsSection } from "./settings-section";

export function EditorSettings() {
  const { preferences, resetPreferences, setSpellcheck } =
    useEditorPreferences();

  return (
    <SettingsSection
      description="Control default behavior while writing and editing notes."
      title="Editor"
    >
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-[minmax(0,0.75fr)_minmax(18rem,1fr)]">
          <div className="flex items-start gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center bg-surface-subtle text-muted-foreground">
              <SpellCheck2 aria-hidden="true" className="size-3.5" />
            </span>

            <div>
              <p className="text-xs font-semibold text-foreground">
                Spell check
              </p>

              <p className="mt-1 max-w-xs text-[11px] leading-5 text-muted-foreground">
                Show browser spelling suggestions while writing notes.
              </p>
            </div>
          </div>

          <div
            aria-label="Spell check preference"
            className="grid grid-cols-2 gap-2 sm:max-w-xs"
            role="group"
          >
            <PreferenceButton
              isActive={preferences.spellcheck}
              label="On"
              onClick={() => setSpellcheck(true)}
            />

            <PreferenceButton
              isActive={!preferences.spellcheck}
              label="Off"
              onClick={() => setSpellcheck(false)}
            />
          </div>
        </div>

        <div className="border-t border-border pt-5">
          <Button
            leftIcon={<RotateCcw className="size-3.5" />}
            onClick={resetPreferences}
            size="sm"
            variant="outline"
          >
            Reset editor preferences
          </Button>
        </div>
      </div>
    </SettingsSection>
  );
}

type PreferenceButtonProps = {
  isActive: boolean;
  label: string;
  onClick: () => void;
};

function PreferenceButton({ isActive, label, onClick }: PreferenceButtonProps) {
  return (
    <button
      aria-pressed={isActive}
      className={cn(
        "notesvault-focus-ring relative min-h-9 border px-3 text-[10px] font-medium transition-colors",
        isActive
          ? "border-border-strong bg-secondary text-foreground"
          : "border-border bg-background text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
      )}
      onClick={onClick}
      type="button"
    >
      {label}

      {isActive ? (
        <Check
          aria-hidden="true"
          className="absolute right-2 top-1/2 size-3 -translate-y-1/2 text-primary"
        />
      ) : null}
    </button>
  );
}
