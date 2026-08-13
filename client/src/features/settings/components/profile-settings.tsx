import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, UserRound } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthenticationSession } from "@/features/authentication/hooks/use-authentication-session";
import { useUpdateProfile } from "@/features/authentication/hooks/use-update-profile";
import {
  getApiErrorCode,
  getApiErrorMessage,
} from "@/services/api/get-api-error";
import { useToast } from "@/hooks/use-toast";

import {
  profileSettingsSchema,
  type ProfileSettingsFormValues,
} from "../schemas/profile-settings.schema";
import { SettingsSection } from "./settings-section";

export function ProfileSettings() {
  const { data: session } = useAuthenticationSession();
  const updateProfileMutation = useUpdateProfile();
  const { showToast } = useToast();

  const defaultValues = useMemo<ProfileSettingsFormValues>(
    () => ({
      firstName: session?.user.firstName ?? "",
      lastName: session?.user.lastName ?? "",
      email: session?.user.email ?? "",
    }),
    [
      session?.user.email,
      session?.user.firstName,
      session?.user.lastName,
    ],
  );

  const {
    formState: { errors, isDirty },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<ProfileSettingsFormValues>({
    defaultValues,
    resolver: zodResolver(profileSettingsSchema),
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  async function onSubmit(values: ProfileSettingsFormValues) {
    if (updateProfileMutation.isPending) {
      return;
    }

    try {
      const result = await updateProfileMutation.mutateAsync({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim().toLowerCase(),
      });

      reset({
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        email: result.user.email,
      });

      showToast({
        title: "Profile updated",
        message: "Your account details have been saved.",
        variant: "success",
      });
    } catch (error) {
      if (getApiErrorCode(error) === "EMAIL_ALREADY_IN_USE") {
        setError("email", {
          type: "server",
          message: "An account with this email already exists.",
        });

        return;
      }

      showToast({
        title: "Unable to update profile",
        message: getApiErrorMessage(
          error,
          "Your profile could not be updated. Please try again.",
        ),
        variant: "error",
      });
    }
  }

  return (
    <SettingsSection
      description="Manage the personal details associated with your account."
      title="Profile"
    >
      <form
        className="space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center bg-surface-subtle text-muted-foreground">
            <UserRound aria-hidden="true" className="size-4" />
          </span>

          <div>
            <p className="text-sm font-medium text-foreground">
              Personal information
            </p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Keep your name and email address up to date.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            autoComplete="given-name"
            error={errors.firstName?.message}
            label="First name"
            placeholder="Enter your first name"
            {...register("firstName")}
          />

          <Input
            autoComplete="family-name"
            error={errors.lastName?.message}
            label="Last name"
            placeholder="Enter your last name"
            {...register("lastName")}
          />
        </div>

        <Input
          autoComplete="email"
          error={errors.email?.message}
          label="Email address"
          leftElement={<Mail aria-hidden="true" className="size-4" />}
          placeholder="Enter your email"
          type="email"
          {...register("email")}
        />

        <div className="flex justify-end border-t border-border pt-5">
          <Button
            disabled={!isDirty}
            isLoading={updateProfileMutation.isPending}
            loadingText="Saving profile"
            type="submit"
          >
            Save profile
          </Button>
        </div>
      </form>
    </SettingsSection>
  );
}
