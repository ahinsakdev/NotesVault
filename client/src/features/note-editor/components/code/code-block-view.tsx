import { Check, Code2, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  NodeViewContent,
  NodeViewWrapper,
  type NodeViewProps,
} from "@tiptap/react";

import { codeLanguageOptions } from "../../extensions/code/code-language-options";

function getLanguageLabel(language: unknown): string {
  if (typeof language !== "string") {
    return "Plain text";
  }

  return (
    codeLanguageOptions.find((option) => option.value === language)?.label ??
    language
  );
}

export function CodeBlockView({ node }: NodeViewProps) {
  const [isCopied, setIsCopied] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  const language = node.attrs.language;
  const languageLabel = getLanguageLabel(language);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(node.textContent);

      setIsCopied(true);

      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }

      resetTimerRef.current = window.setTimeout(() => {
        setIsCopied(false);
        resetTimerRef.current = null;
      }, 1800);
    } catch {
      setIsCopied(false);
    }
  }

  return (
    <NodeViewWrapper
      className="notesvault-code-shell"
      data-language={typeof language === "string" ? language : "plaintext"}
    >
      <div className="notesvault-code-header" contentEditable={false}>
        <div className="flex min-w-0 items-center gap-2">
          <Code2 aria-hidden="true" className="size-3.5 shrink-0" />

          <span className="truncate">{languageLabel}</span>
        </div>

        <button
          aria-label={isCopied ? "Code copied" : "Copy code block"}
          className="notesvault-code-copy"
          onClick={() => {
            void handleCopy();
          }}
          title={isCopied ? "Copied" : "Copy code"}
          type="button"
        >
          {isCopied ? (
            <Check aria-hidden="true" className="size-3" />
          ) : (
            <Copy aria-hidden="true" className="size-3" />
          )}

          <span>{isCopied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <pre className="notesvault-code-block">
        <code>
          <NodeViewContent className="notesvault-code-content" />
        </code>
      </pre>
    </NodeViewWrapper>
  );
}
