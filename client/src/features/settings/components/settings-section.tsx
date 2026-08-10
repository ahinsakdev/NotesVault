import type { ReactNode } from "react";

type SettingsSectionProps = {
  children: ReactNode;
  description: string;
  title: string;
};

export function SettingsSection({
  children,
  description,
  title,
}: SettingsSectionProps) {
  return (
    <section className="border border-border bg-card shadow-card">
      <header className="border-b border-border px-5 py-4 sm:px-6">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </header>

      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}
