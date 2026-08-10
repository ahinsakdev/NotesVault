import { ROUTES } from "@/app/routes";
import { AuthFooterLink } from "@/features/authentication/components/auth-footer-link";
import { AuthPageContainer } from "@/features/authentication/components/auth-page-container";
import { ForgotPasswordForm } from "@/features/authentication/components/forgot-password-form";

export function ForgotPasswordPage() {
  return (
    <AuthPageContainer
      title="Forgot your password?"
      description="Enter your email and we'll send you a password reset link."
      footer={
        <AuthFooterLink
          direction="left"
          linkLabel="Back to sign in"
          to={ROUTES.login}
        />
      }
    >
      <ForgotPasswordForm />
    </AuthPageContainer>
  );
}
