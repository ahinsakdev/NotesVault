import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

import { ROUTES } from "@/app/routes";
import { Button } from "@/components/ui/button";
import { useResetPassword } from "@/features/authentication/hooks/use-reset-password";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/features/authentication/schemas/reset-password.schema";
import { useToast } from "@/hooks/use-toast";
import { getApiErrorMessage } from "@/services/api/get-api-error";

import { PasswordField } from "./password-field";

const defaultValues: ResetPasswordFormValues = {
  password: "",
  confirmPassword: "",
};

export function ResetPasswordForm() {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const { showToast } = useToast();
  const resetPasswordMutation = useResetPassword();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ResetPasswordFormValues>({
    defaultValues,
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(values: ResetPasswordFormValues) {
    if (!token) {
      showToast({
        title: "Invalid reset link",
        message: "This password reset link is invalid.",
      });

      return;
    }

    try {
      const result = await resetPasswordMutation.mutateAsync({
        token,
        password: values.password,
      });

      showToast({
        title: "Password updated",
        message: result.message,
      });

      navigate(ROUTES.login, {
        replace: true,
      });
    } catch (error) {
      showToast({
        title: "Unable to reset password",
        message: getApiErrorMessage(
          error,
          "We couldn't reset your password. Please request a new link.",
        ),
      });
    }
  }

  return (
    <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <PasswordField
          autoComplete="new-password"
          error={errors.password?.message}
          label="Password"
          placeholder="Create a password"
          {...register("password")}
        />

        <PasswordField
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          label="Confirm password"
          placeholder="Confirm password"
          {...register("confirmPassword")}
        />
      </div>

      <Button
        className="w-full"
        isLoading={isSubmitting}
        loadingText="Resetting password"
        size="lg"
        type="submit"
      >
        Reset password
      </Button>
    </form>
  );
}
