import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import type {
  SlashCommandItem,
  SlashCommandMenuHandle,
} from "../types/slash-command.types";
import { SlashCommandItem as SlashCommandItemComponent } from "./slash-command-item";

export type SlashCommandMenuProps = {
  items: SlashCommandItem[];
  onSelect: (item: SlashCommandItem) => void;
};

export const SlashCommandMenu = forwardRef<
  SlashCommandMenuHandle,
  SlashCommandMenuProps
>(function SlashCommandMenu({ items, onSelect }, ref) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  function selectItem(index: number) {
    const item = items[index];

    if (item) {
      onSelect(item);
    }
  }

  function moveSelection(direction: 1 | -1) {
    if (items.length === 0) {
      return;
    }

    setSelectedIndex((currentIndex) => {
      const nextIndex = currentIndex + direction;

      if (nextIndex < 0) {
        return items.length - 1;
      }

      if (nextIndex >= items.length) {
        return 0;
      }

      return nextIndex;
    });
  }

  useImperativeHandle(ref, () => ({
    onKeyDown(event) {
      if (event.key === "ArrowUp") {
        moveSelection(-1);
        return true;
      }

      if (event.key === "ArrowDown") {
        moveSelection(1);
        return true;
      }

      if (event.key === "Enter") {
        selectItem(selectedIndex);
        return true;
      }

      return false;
    },
  }));

  return (
    <div
      aria-label="Slash commands"
      className="notesvault-slash-menu max-h-80 w-[min(22rem,calc(100vw-2rem))] overflow-y-auto border border-border bg-card p-1 shadow-card"
      role="listbox"
    >
      {items.length > 0 ? (
        items.map((item, index) => (
          <SlashCommandItemComponent
            command={item}
            isSelected={index === selectedIndex}
            key={item.id}
            onSelect={() => selectItem(index)}
          />
        ))
      ) : (
        <div className="px-3 py-6 text-center">
          <p className="text-xs font-medium text-foreground">
            No commands found
          </p>

          <p className="mt-1 text-[10px] text-muted-foreground">
            Try another command name.
          </p>
        </div>
      )}
    </div>
  );
});
