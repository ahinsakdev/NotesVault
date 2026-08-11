import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { ROUTES } from "@/app/routes";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useSignup } from "@/features/authentication/hooks/use-signup";
import {
  signupSchema,
  type SignupFormValues,
} from "@/features/authentication/schemas/signup.schema";
import { useToast } from "@/hooks/use-toast";
import {
  getApiErrorCode,
  getApiErrorMessage,
} from "@/services/api/get-api-error";

import { PasswordField } from "./password-field";

const defaultValues: SignupFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptedTerms: false,
};

export function SignupForm() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const signupMutation = useSignup();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<SignupFormValues>({
    defaultValues,
    resolver: zodResolver(signupSchema),
  });

  async function onSubmit(values: SignupFormValues) {
    try {
      await signupMutation.mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });

      navigate(ROUTES.dashboard, {
        replace: true,
      });

      showToast({
        title: "Account created",
        message: "Welcome to NotesVault.",
      });
    } catch (error) {
      if (getApiErrorCode(error) === "EMAIL_ALREADY_IN_USE") {
        setError(
          "email",
          {
            message: "An account with this email already exists.",
          },
          {
            shouldFocus: true,
          },
        );

        return;
      }

      showToast({
        title: "Unable to create account",
        message: getApiErrorMessage(
          error,
          "We couldn't create your account. Please try again.",
        ),
      });
    }
  }

  return (
    <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          autoComplete="given-name"
          error={errors.firstName?.message}
          label="First name"
          placeholder="First name"
          {...register("firstName")}
        />

        <Input
          autoComplete="family-name"
          error={errors.lastName?.message}
          label="Last name"
          placeholder="Last name"
          {...register("lastName")}
        />
      </div>

      <Input
        autoComplete="email"
        error={errors.email?.message}
        label="Email address"
        placeholder="Enter your email"
        type="email"
        {...register("email")}
      />

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

      <div>
        <label className="flex items-start gap-2.5 text-sm leading-5 text-muted-foreground">
          <Checkbox
            aria-describedby={
              errors.acceptedTerms ? "signup-accepted-terms-error" : undefined
            }
            aria-invalid={Boolean(errors.acceptedTerms)}
            className="mt-0.5 shrink-0"
            {...register("acceptedTerms")}
          />

          <span>
            I agree to the{" "}
            <Link
              className="font-medium text-primary transition-colors duration-[var(--motion-standard)] hover:text-primary-hover"
              to={ROUTES.terms}
            >
              Terms
            </Link>{" "}
            &{" "}
            <Link
              className="font-medium text-primary transition-colors duration-[var(--motion-standard)] hover:text-primary-hover"
              to={ROUTES.privacy}
            >
              Privacy Policy
            </Link>
          </span>
        </label>

        {errors.acceptedTerms?.message ? (
          <p
            className="mt-1.5 text-xs text-danger"
            id="signup-accepted-terms-error"
            role="alert"
          >
            {errors.acceptedTerms.message}
          </p>
        ) : null}
      </div>

      <Button
        className="w-full"
        isLoading={isSubmitting}
        loadingText="Creating account"
        size="lg"
        type="submit"
      >
        Create account
      </Button>
    </form>
  );
}
