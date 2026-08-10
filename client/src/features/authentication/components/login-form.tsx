import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

import { ROUTES } from "@/app/routes";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/authentication/schemas/login.schema";

import { PasswordField } from "./password-field";

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
  rememberMe: false,
};

export function LoginForm() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginFormValues) {
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

      <PasswordField
        autoComplete="current-password"
        error={errors.password?.message}
        label="Password"
        placeholder="Enter your password"
        {...register("password")}
      />

      <div className="flex items-center justify-between gap-4">
        <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Checkbox {...register("rememberMe")} />
          Remember me
        </label>

        <Link
          className="text-sm font-medium text-primary transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:text-primary-hover"
          to={ROUTES.forgotPassword}
        >
          Forgot password?
        </Link>
      </div>

      <Button
        className="w-full"
        isLoading={isSubmitting}
        loadingText="Signing in"
        size="lg"
        type="submit"
      >
        Sign in
      </Button>
    </form>
  );
}
