import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/features/authentication/schemas/reset-password.schema";

import { PasswordField } from "./password-field";

const defaultValues: ResetPasswordFormValues = {
  password: "",
  confirmPassword: "",
};

export function ResetPasswordForm() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ResetPasswordFormValues>({
    defaultValues,
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(values: ResetPasswordFormValues) {
    await Promise.resolve(values);
  }

  return (
    <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <PasswordField
          error={errors.password?.message}
          label="Password"
          placeholder="Create a password"
          {...register("password")}
        />

        <PasswordField
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
