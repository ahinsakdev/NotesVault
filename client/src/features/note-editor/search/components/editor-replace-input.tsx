import { Replace } from "lucide-react";

type EditorReplaceInputProps = {
  onChange: (value: string) => void;
  value: string;
};

export function EditorReplaceInput({
  onChange,
  value,
}: EditorReplaceInputProps) {
  return (
    <label className="notesvault-search-field">
      <Replace aria-hidden="true" className="notesvault-search-field-icon" />

      <span className="sr-only">Replace with</span>

      <input
        autoComplete="off"
        className="notesvault-search-input"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Replace with..."
        spellCheck={false}
        type="text"
        value={value}
      />
    </label>
  );
}
