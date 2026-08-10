import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/features/authentication/schemas/forgot-password.schema";

const defaultValues: ForgotPasswordFormValues = {
  email: "",
};

export function ForgotPasswordForm() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ForgotPasswordFormValues>({
    defaultValues,
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    await Promise.resolve(values);
  }

  return (
    <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Input
        autoComplete="email"
        error={errors.email?.message}
        label="Email address"
        placeholder="Enter your email"
        type="email"
        {...register("email")}
      />

      <Button
        className="w-full"
        isLoading={isSubmitting}
        loadingText="Sending link"
        size="lg"
        type="submit"
      >
        Send reset link
      </Button>
    </form>
  );
}
