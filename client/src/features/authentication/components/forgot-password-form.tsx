import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/features/authentication/hooks/use-forgot-password";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/features/authentication/schemas/forgot-password.schema";
import { useToast } from "@/hooks/use-toast";
import { getApiErrorMessage } from "@/services/api/get-api-error";

const defaultValues: ForgotPasswordFormValues = {
  email: "",
};

export function ForgotPasswordForm() {
  const { showToast } = useToast();
  const forgotPasswordMutation = useForgotPassword();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ForgotPasswordFormValues>({
    defaultValues,
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    try {
      const result = await forgotPasswordMutation.mutateAsync(values);

      showToast({
        title: "Check your email",
        message: result.message,
      });
    } catch (error) {
      showToast({
        title: "Unable to send reset link",
        message: getApiErrorMessage(
          error,
          "We couldn't process your request. Please try again.",
        ),
      });
    }
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
