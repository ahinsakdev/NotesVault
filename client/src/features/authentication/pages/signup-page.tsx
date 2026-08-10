import { ROUTES } from "@/app/routes";
import { AuthFooterLink } from "@/features/authentication/components/auth-footer-link";
import { AuthPageContainer } from "@/features/authentication/components/auth-page-container";
import { SignupForm } from "@/features/authentication/components/signup-form";

export function SignupPage() {
  return (
    <AuthPageContainer
      description="Create your workspace to get started."
      footer={
        <AuthFooterLink
          label="Already have an account?"
          linkLabel="Sign in"
          to={ROUTES.login}
        />
      }
      title="Create your account"
    >
      <SignupForm />
    </AuthPageContainer>
  );
}
