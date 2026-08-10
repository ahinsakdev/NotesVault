type EditorSearchMatchCounterProps = {
  current: number;
  total: number;
};

export function EditorSearchMatchCounter({
  current,
  total,
}: EditorSearchMatchCounterProps) {
  return (
    <span className="notesvault-search-counter">
      {total === 0 ? "0 / 0" : `${current + 1} / ${total}`}
    </span>
  );
}
