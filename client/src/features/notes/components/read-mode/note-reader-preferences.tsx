import {
  AlignJustify,
  CaseSensitive,
  RotateCcw,
  SlidersHorizontal,
  Type,
  X,
} from "lucide-react";
import { useRef, type ReactNode, type RefObject } from "react";

import { useDisclosurePanel } from "@/hooks/use-disclosure-panel";
import { cn } from "@/utils/cn";

import type {
  ReaderFontFamily,
  ReaderFontSize,
  ReaderLineHeight,
  ReaderPreferences,
  ReaderWidth,
} from "../../types/reader-preferences.types";

type NoteReaderPreferencesProps = {
  isOpen: boolean;
  preferences: ReaderPreferences;
  triggerRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onFontFamilyChange: (value: ReaderFontFamily) => void;
  onFontSizeChange: (value: ReaderFontSize) => void;
  onLineHeightChange: (value: ReaderLineHeight) => void;
  onReset: () => void;
  onWidthChange: (value: ReaderWidth) => void;
};

export function NoteReaderPreferences({
  isOpen,
  preferences,
  triggerRef,
  onClose,
  onFontFamilyChange,
  onFontSizeChange,
  onLineHeightChange,
  onReset,
  onWidthChange,
}: NoteReaderPreferencesProps) {
  const panelRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useDisclosurePanel({
    closeOnOutsidePointer: false,
    initialFocusRef: closeButtonRef,
    isOpen,
    onClose,
    panelRef,
    triggerRef,
  });

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <button
        aria-label="Close reading preferences"
        className="fixed inset-0 z-40 cursor-default bg-background/35 backdrop-blur-[1px] md:bg-transparent md:backdrop-blur-none"
        onClick={onClose}
        type="button"
      />

      <aside
        aria-label="Reading preferences"
        className="fixed inset-x-3 bottom-3 z-50 max-h-[80vh] overflow-hidden border border-border bg-popover text-popover-foreground shadow-dialog md:inset-x-auto md:bottom-auto md:right-6 md:top-24 md:w-80"
        id="notesvault-reading-preferences"
        ref={panelRef}
        role="region"
        tabIndex={-1}
      >
        <header className="flex h-12 items-center gap-2 border-b border-border bg-surface-subtle px-3">
          <SlidersHorizontal
            aria-hidden="true"
            className="size-3.5 text-muted-foreground"
          />

          <div className="min-w-0">
            <h2 className="text-xs font-semibold text-foreground">
              Reading preferences
            </h2>

            <p className="text-[9px] text-muted-foreground">
              Adjust the document appearance
            </p>
          </div>

          <button
            aria-label="Close reading preferences"
            className="ml-auto flex size-8 items-center justify-center text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary hover:text-foreground"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <X aria-hidden="true" className="size-3.5" />
          </button>
        </header>

        <div className="notesvault-outline-scrollbar max-h-[calc(80vh-3rem)] space-y-5 overflow-y-auto p-4">
          <PreferenceSection icon={Type} label="Font family">
            <div className="grid grid-cols-2 gap-2">
              <PreferenceButton
                isActive={preferences.fontFamily === "serif"}
                label="Serif"
                onClick={() => onFontFamilyChange("serif")}
              />

              <PreferenceButton
                isActive={preferences.fontFamily === "sans"}
                label="Sans"
                onClick={() => onFontFamilyChange("sans")}
              />
            </div>
          </PreferenceSection>

          <PreferenceSection icon={CaseSensitive} label="Text size">
            <div className="grid grid-cols-3 gap-2">
              <PreferenceButton
                isActive={preferences.fontSize === "small"}
                label="Small"
                onClick={() => onFontSizeChange("small")}
              />

              <PreferenceButton
                isActive={preferences.fontSize === "default"}
                label="Default"
                onClick={() => onFontSizeChange("default")}
              />

              <PreferenceButton
                isActive={preferences.fontSize === "large"}
                label="Large"
                onClick={() => onFontSizeChange("large")}
              />
            </div>
          </PreferenceSection>

          <PreferenceSection icon={AlignJustify} label="Line spacing">
            <div className="grid grid-cols-3 gap-2">
              <PreferenceButton
                isActive={preferences.lineHeight === "compact"}
                label="Compact"
                onClick={() => onLineHeightChange("compact")}
              />

              <PreferenceButton
                isActive={preferences.lineHeight === "normal"}
                label="Normal"
                onClick={() => onLineHeightChange("normal")}
              />

              <PreferenceButton
                isActive={preferences.lineHeight === "relaxed"}
                label="Relaxed"
                onClick={() => onLineHeightChange("relaxed")}
              />
            </div>
          </PreferenceSection>

          <PreferenceSection icon={SlidersHorizontal} label="Reading width">
            <div className="grid grid-cols-3 gap-2">
              <PreferenceButton
                isActive={preferences.width === "compact"}
                label="Compact"
                onClick={() => onWidthChange("compact")}
              />

              <PreferenceButton
                isActive={preferences.width === "comfortable"}
                label="Comfort"
                onClick={() => onWidthChange("comfortable")}
              />

              <PreferenceButton
                isActive={preferences.width === "wide"}
                label="Wide"
                onClick={() => onWidthChange("wide")}
              />
            </div>
          </PreferenceSection>

          <button
            className="inline-flex h-8 w-full items-center justify-center gap-2 border border-border bg-background px-3 text-[10px] font-medium text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary hover:text-foreground"
            onClick={onReset}
            type="button"
          >
            <RotateCcw aria-hidden="true" className="size-3" />
            Reset reading preferences
          </button>
        </div>
      </aside>
    </>
  );
}

type PreferenceSectionProps = {
  children: ReactNode;
  icon: typeof Type;
  label: string;
};

function PreferenceSection({
  children,
  icon: Icon,
  label,
}: PreferenceSectionProps) {
  return (
    <section>
      <div className="mb-2 flex items-center gap-2 text-[10px] font-medium text-muted-foreground">
        <Icon aria-hidden="true" className="size-3" />
        {label}
      </div>

      {children}
    </section>
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
        "flex min-h-9 items-center justify-center border px-2 text-[10px] font-medium transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)]",
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
