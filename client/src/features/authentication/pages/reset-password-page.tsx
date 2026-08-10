import { ROUTES } from "@/app/routes";
import { AuthFooterLink } from "@/features/authentication/components/auth-footer-link";
import { AuthPageContainer } from "@/features/authentication/components/auth-page-container";
import { ResetPasswordForm } from "@/features/authentication/components/reset-password-form";

export function ResetPasswordPage() {
  return (
    <AuthPageContainer
      title="Create a new password"
      description="Your new password must be different from your previous password."
      footer={
        <AuthFooterLink
          direction="left"
          linkLabel="Back to sign in"
          to={ROUTES.login}
        />
      }
    >
      <ResetPasswordForm />
    </AuthPageContainer>
  );
}
