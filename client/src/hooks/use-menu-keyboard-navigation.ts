import { useEffect, type RefObject } from "react";

type UseMenuKeyboardNavigationOptions = {
  isOpen: boolean;
  menuRef: RefObject<HTMLElement | null>;
  triggerRef: RefObject<HTMLElement | null>;
  onClose: () => void;
};

const MENU_ITEM_SELECTOR = '[role="menuitem"]:not([aria-disabled="true"])';

export function useMenuKeyboardNavigation({
  isOpen,
  menuRef,
  onClose,
  triggerRef,
}: UseMenuKeyboardNavigationOptions) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function getMenuItems() {
      const menu = menuRef.current;

      if (!menu) {
        return [];
      }

      return Array.from(
        menu.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR),
      ).filter(
        (item) => !item.hasAttribute("disabled") && item.offsetParent !== null,
      );
    }

    const animationFrameId = window.requestAnimationFrame(() => {
      getMenuItems()[0]?.focus();
    });

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;

      if (
        menuRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }

      onClose();
    }

    function handleFocusIn(event: FocusEvent) {
      const target = event.target as Node;

      if (
        menuRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }

      onClose();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();

        onClose();

        window.requestAnimationFrame(() => {
          triggerRef.current?.focus();
        });

        return;
      }

      if (
        event.key !== "ArrowDown" &&
        event.key !== "ArrowUp" &&
        event.key !== "Home" &&
        event.key !== "End"
      ) {
        return;
      }

      const items = getMenuItems();

      if (items.length === 0) {
        return;
      }

      const currentIndex = items.findIndex(
        (item) => item === document.activeElement,
      );

      let nextIndex = currentIndex;

      if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = items.length - 1;
      } else if (event.key === "ArrowDown") {
        nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % items.length;
      } else if (event.key === "ArrowUp") {
        nextIndex =
          currentIndex < 0
            ? items.length - 1
            : (currentIndex - 1 + items.length) % items.length;
      }

      event.preventDefault();
      items[nextIndex]?.focus();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("focusin", handleFocusIn);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(animationFrameId);

      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, menuRef, onClose, triggerRef]);
}
