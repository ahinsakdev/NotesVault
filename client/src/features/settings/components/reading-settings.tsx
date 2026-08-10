import type { ReactNode } from "react";
import {
  AlignJustify,
  CaseSensitive,
  RotateCcw,
  SlidersHorizontal,
  Type,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useReaderPreferences } from "@/features/notes/hooks/use-reader-preferences";
import { cn } from "@/utils/cn";

import { SettingsSection } from "./settings-section";

export function ReadingSettings() {
  const {
    preferences,
    resetPreferences,
    setFontFamily,
    setFontSize,
    setLineHeight,
    setWidth,
  } = useReaderPreferences();

  return (
    <SettingsSection
      description="Choose the default reading experience used in note read mode."
      title="Reading"
    >
      <div className="space-y-6">
        <PreferenceGroup
          description="Choose the typeface used for note content."
          icon={Type}
          title="Font family"
        >
          <div className="grid grid-cols-2 gap-2 sm:max-w-sm">
            <PreferenceButton
              isActive={preferences.fontFamily === "serif"}
              label="Serif"
              onClick={() => setFontFamily("serif")}
            />

            <PreferenceButton
              isActive={preferences.fontFamily === "sans"}
              label="Sans"
              onClick={() => setFontFamily("sans")}
            />
          </div>
        </PreferenceGroup>

        <PreferenceGroup
          description="Control the default size of note text."
          icon={CaseSensitive}
          title="Text size"
        >
          <div className="grid grid-cols-3 gap-2 sm:max-w-md">
            <PreferenceButton
              isActive={preferences.fontSize === "small"}
              label="Small"
              onClick={() => setFontSize("small")}
            />

            <PreferenceButton
              isActive={preferences.fontSize === "default"}
              label="Default"
              onClick={() => setFontSize("default")}
            />

            <PreferenceButton
              isActive={preferences.fontSize === "large"}
              label="Large"
              onClick={() => setFontSize("large")}
            />
          </div>
        </PreferenceGroup>

        <PreferenceGroup
          description="Adjust vertical spacing between lines of text."
          icon={AlignJustify}
          title="Line spacing"
        >
          <div className="grid grid-cols-3 gap-2 sm:max-w-md">
            <PreferenceButton
              isActive={preferences.lineHeight === "compact"}
              label="Compact"
              onClick={() => setLineHeight("compact")}
            />

            <PreferenceButton
              isActive={preferences.lineHeight === "normal"}
              label="Normal"
              onClick={() => setLineHeight("normal")}
            />

            <PreferenceButton
              isActive={preferences.lineHeight === "relaxed"}
              label="Relaxed"
              onClick={() => setLineHeight("relaxed")}
            />
          </div>
        </PreferenceGroup>

        <PreferenceGroup
          description="Set the maximum width of the reading column."
          icon={SlidersHorizontal}
          title="Reading width"
        >
          <div className="grid grid-cols-3 gap-2 sm:max-w-md">
            <PreferenceButton
              isActive={preferences.width === "compact"}
              label="Compact"
              onClick={() => setWidth("compact")}
            />

            <PreferenceButton
              isActive={preferences.width === "comfortable"}
              label="Comfort"
              onClick={() => setWidth("comfortable")}
            />

            <PreferenceButton
              isActive={preferences.width === "wide"}
              label="Wide"
              onClick={() => setWidth("wide")}
            />
          </div>
        </PreferenceGroup>

        <div className="border-t border-border pt-5">
          <Button
            leftIcon={<RotateCcw className="size-3.5" />}
            onClick={resetPreferences}
            size="sm"
            variant="outline"
          >
            Reset reading preferences
          </Button>
        </div>
      </div>
    </SettingsSection>
  );
}

type PreferenceGroupProps = {
  children: ReactNode;
  description: string;
  icon: typeof Type;
  title: string;
};

function PreferenceGroup({
  children,
  description,
  icon: Icon,
  title,
}: PreferenceGroupProps) {
  return (
    <div className="grid gap-4 border-b border-border pb-6 last:border-b-0 last:pb-0 sm:grid-cols-[minmax(0,0.75fr)_minmax(18rem,1fr)]">
      <div className="flex items-start gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center bg-surface-subtle text-muted-foreground">
          <Icon aria-hidden="true" className="size-3.5" />
        </span>

        <div>
          <p className="text-xs font-semibold text-foreground">{title}</p>

          <p className="mt-1 max-w-xs text-[11px] leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <div>{children}</div>
    </div>
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
        "notesvault-focus-ring min-h-9 border px-3 text-[10px] font-medium transition-colors",
        isActive
          ? "border-border-strong bg-secondary text-foreground"
          : "border-border bg-background text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
      )}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
