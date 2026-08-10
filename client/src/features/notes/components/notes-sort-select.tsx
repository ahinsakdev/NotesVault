import { ArrowDownUp } from "lucide-react";

import type { NotesSortOption } from "../types/note.types";

type NotesSortSelectProps = {
  value: NotesSortOption;
  onChange: (value: NotesSortOption) => void;
};

const sortOptions: {
  label: string;
  value: NotesSortOption;
}[] = [
  {
    label: "Recently updated",
    value: "updated-desc",
  },
  {
    label: "Oldest updated",
    value: "updated-asc",
  },
  {
    label: "Newest created",
    value: "created-desc",
  },
  {
    label: "Oldest created",
    value: "created-asc",
  },
  {
    label: "Title A–Z",
    value: "title-asc",
  },
  {
    label: "Title Z–A",
    value: "title-desc",
  },
];

export function NotesSortSelect({ value, onChange }: NotesSortSelectProps) {
  return (
    <label className="relative block shrink-0">
      <span className="sr-only">Sort notes</span>

      <ArrowDownUp
        aria-hidden="true"
        className="pointer-events-none absolute left-2.5 top-1/2 size-3 -translate-y-1/2 text-muted-foreground"
      />

      <select
        className="h-8 min-w-[10rem] appearance-none border border-input bg-background pl-8 pr-7 text-xs text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
        onChange={(event) => onChange(event.target.value as NotesSortOption)}
        value={value}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[8px] text-muted-foreground"
      >
        ▼
      </span>
    </label>
  );
}
