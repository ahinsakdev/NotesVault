import { Search, X } from "lucide-react";
import type { RefObject } from "react";

type EditorSearchInputProps = {
  inputRef: RefObject<HTMLInputElement | null>;
  onChange: (value: string) => void;
  value: string;
};

export function EditorSearchInput({
  inputRef,
  onChange,
  value,
}: EditorSearchInputProps) {
  return (
    <label className="notesvault-search-field">
      <Search aria-hidden="true" className="notesvault-search-field-icon" />

      <span className="sr-only">Find in document</span>

      <input
        autoComplete="off"
        className="notesvault-search-input"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Find in document..."
        ref={inputRef}
        spellCheck={false}
        type="search"
        value={value}
      />

      {value ? (
        <button
          aria-label="Clear search"
          className="notesvault-search-clear"
          onClick={() => onChange("")}
          type="button"
        >
          <X aria-hidden="true" className="size-3" />
        </button>
      ) : null}
    </label>
  );
}
