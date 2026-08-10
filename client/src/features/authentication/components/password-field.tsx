import { forwardRef, type InputHTMLAttributes } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";

type PasswordFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label: string;
  error?: string;
};

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField(
    { autoComplete = "new-password", error, label, ...props },
    ref,
  ) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
      <Input
        {...props}
        autoComplete={autoComplete}
        error={error}
        label={label}
        ref={ref}
        rightElement={
          <button
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            className="notesvault-focus-ring flex size-5 items-center justify-center text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:text-foreground"
            onClick={() =>
              setIsPasswordVisible((currentValue) => !currentValue)
            }
            type="button"
          >
            {isPasswordVisible ? (
              <Eye aria-hidden="true" className="size-4" strokeWidth={1.75} />
            ) : (
              <EyeClosed
                aria-hidden="true"
                className="size-4"
                strokeWidth={1.75}
              />
            )}
          </button>
        }
        type={isPasswordVisible ? "text" : "password"}
      />
    );
  },
);
