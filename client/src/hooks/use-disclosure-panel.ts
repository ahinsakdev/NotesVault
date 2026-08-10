import { useEffect, type RefObject } from "react";

type UseDisclosurePanelOptions = {
  isOpen: boolean;
  panelRef: RefObject<HTMLElement | null>;
  triggerRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  closeOnOutsidePointer?: boolean;
  onClose: () => void;
};

export function useDisclosurePanel({
  closeOnOutsidePointer = true,
  initialFocusRef,
  isOpen,
  onClose,
  panelRef,
  triggerRef,
}: UseDisclosurePanelOptions) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const animationFrameId = window.requestAnimationFrame(() => {
      initialFocusRef?.current?.focus();
    });

    function handlePointerDown(event: PointerEvent) {
      if (!closeOnOutsidePointer) {
        return;
      }

      const target = event.target as Node;

      if (
        panelRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }

      onClose();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      event.preventDefault();
      onClose();

      window.requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    }

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(animationFrameId);

      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    closeOnOutsidePointer,
    initialFocusRef,
    isOpen,
    onClose,
    panelRef,
    triggerRef,
  ]);
}
