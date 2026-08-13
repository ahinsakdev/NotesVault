import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { PasswordField } from "@/features/authentication/components/password-field";
import { useChangePassword } from "@/features/authentication/hooks/use-change-password";
import { useToast } from "@/hooks/use-toast";
import {
  getApiErrorCode,
  getApiErrorMessage,
} from "@/services/api/get-api-error";

import {
  changePasswordSettingsSchema,
  type ChangePasswordSettingsFormValues,
} from "../schemas/change-password-settings.schema";
import { SettingsSection } from "./settings-section";

const defaultValues: ChangePasswordSettingsFormValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export function SecuritySettings() {
  const changePasswordMutation = useChangePassword();
  const { showToast } = useToast();

  const {
    formState: { errors, isDirty },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<ChangePasswordSettingsFormValues>({
    defaultValues,
    resolver: zodResolver(changePasswordSettingsSchema),
  });

  async function onSubmit(values: ChangePasswordSettingsFormValues) {
    if (changePasswordMutation.isPending) {
      return;
    }

    try {
      const result = await changePasswordMutation.mutateAsync({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      reset(defaultValues);

      showToast({
        title: "Password updated",
        message: result.message,
        variant: "success",
      });
    } catch (error) {
      const errorCode = getApiErrorCode(error);

      if (errorCode === "INVALID_CURRENT_PASSWORD") {
        setError("currentPassword", {
          type: "server",
          message: "Current password is incorrect.",
        });

        return;
      }

      if (errorCode === "PASSWORD_REUSE_NOT_ALLOWED") {
        setError("newPassword", {
          type: "server",
          message:
            "New password must be different from your current password.",
        });

        return;
      }

      showToast({
        title: "Unable to change password",
        message: getApiErrorMessage(
          error,
          "We couldn't change your password. Please try again.",
        ),
        variant: "error",
      });
    }
  }

  return (
    <SettingsSection
      description="Change your password to keep your NotesVault account secure."
      title="Security"
    >
      <form
        className="space-y-5"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center bg-surface-subtle text-muted-foreground">
            <LockKeyhole
              aria-hidden="true"
              className="size-4"
              strokeWidth={1.75}
            />
          </span>

          <div>
            <p className="text-sm font-medium text-foreground">
              Account password
            </p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Use a strong password you do not reuse on other accounts.
            </p>
          </div>
        </div>

        <PasswordField
          autoComplete="current-password"
          error={errors.currentPassword?.message}
          label="Current password"
          placeholder="Enter your current password"
          {...register("currentPassword")}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <PasswordField
            autoComplete="new-password"
            error={errors.newPassword?.message}
            label="New password"
            placeholder="Create a new password"
            {...register("newPassword")}
          />

          <PasswordField
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            label="Confirm new password"
            placeholder="Confirm your new password"
            {...register("confirmPassword")}
          />
        </div>

        <div className="flex justify-end border-t border-border pt-5">
          <Button
            disabled={!isDirty}
            isLoading={changePasswordMutation.isPending}
            loadingText="Updating password"
            type="submit"
          >
            Update password
          </Button>
        </div>
      </form>
    </SettingsSection>
  );
}
