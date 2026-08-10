import { ROUTES } from "@/app/routes";
import { AuthFooterLink } from "@/features/authentication/components/auth-footer-link";
import { AuthPageContainer } from "@/features/authentication/components/auth-page-container";
import { LoginForm } from "@/features/authentication/components/login-form";

export function LoginPage() {
  return (
    <AuthPageContainer
      description="Sign in to continue to your knowledge workspace."
      footer={
        <AuthFooterLink
          label="Don't have an account?"
          linkLabel="Create one"
          to={ROUTES.signup}
        />
      }
      title="Welcome back"
    >
      <LoginForm />
    </AuthPageContainer>
  );
}
