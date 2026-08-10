import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
} from "react";

import { cn } from "@/utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, hint, id, label, leftElement, rightElement, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const descriptionId = error
    ? `${inputId}-error`
    : hint
      ? `${inputId}-hint`
      : undefined;

  return (
    <div className="w-full">
      {label ? (
        <label
          className="mb-1.5 block text-sm font-medium text-foreground"
          htmlFor={inputId}
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        {leftElement ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            {leftElement}
          </div>
        ) : null}

        <input
          aria-describedby={descriptionId}
          aria-invalid={Boolean(error)}
          className={cn(
            "min-h-10 w-full rounded-none border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors",
            "placeholder:text-muted-foreground",
            "focus:border-ring focus:ring-2 focus:ring-ring/20",
            "disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-70",
            leftElement && "pl-10",
            rightElement && "pr-10",
            error
              ? "border-danger focus:border-danger focus:ring-danger/20"
              : "border-input",
            className,
          )}
          id={inputId}
          ref={ref}
          {...props}
        />

        {rightElement ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
            {rightElement}
          </div>
        ) : null}
      </div>
      
      {error ? (
        <p
          className="mt-1.5 text-xs text-danger"
          id={`${inputId}-error`}
          role="alert"
        >
          {error}
        </p>
      ) : hint ? (
        <p
          className="mt-1.5 text-xs text-muted-foreground"
          id={`${inputId}-hint`}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
});
