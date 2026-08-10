import { Link } from "react-router";

import { ROUTES } from "@/app/routes";
import { AuthPageContainer } from "@/features/authentication/components/auth-page-container";

export function TermsPage() {
  return (
    <AuthPageContainer
      description="Please review the terms that apply when using NotesVault."
      footer={
        <Link
          className="font-medium text-primary transition-colors hover:text-primary-hover"
          to={ROUTES.signup}
        >
          Back to sign up
        </Link>
      }
      title="Terms of Service"
    >
      <div className="space-y-5 text-sm leading-7 text-muted-foreground">
        <section>
          <h2 className="text-sm font-semibold text-foreground">
            Using NotesVault
          </h2>

          <p className="mt-1.5">
            NotesVault is designed to help you create, organize, read, search,
            and manage personal notes. You are responsible for the content you
            create and for using the application appropriately.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-foreground">
            Account responsibility
          </h2>

          <p className="mt-1.5">
            You are responsible for keeping your account credentials secure and
            for activity performed through your account.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-foreground">
            Acceptable use
          </h2>

          <p className="mt-1.5">
            You must not misuse NotesVault, attempt to disrupt the service, or
            use the application in a way that violates applicable laws or the
            rights of others.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-foreground">
            Service changes
          </h2>

          <p className="mt-1.5">
            Features may be improved, changed, or removed as NotesVault
            develops. These terms may also be updated when the service changes.
          </p>
        </section>
      </div>
    </AuthPageContainer>
  );
}
